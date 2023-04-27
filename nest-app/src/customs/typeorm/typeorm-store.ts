import { SessionData, SessionOptions, Store } from 'express-session';
import { In, IsNull, Repository } from 'typeorm';
import { Session } from '../../models/main/session/session.entity';

export type Ttl =
  | number
  | ((store: TypeormStore, session: SessionData, sid?: string) => number);

type CallbackFn = (error?: Error | null, session?: SessionData | null) => void;
type OnCatchError = (s: TypeormStore, e: Error) => void;

type SessionStoreOptions = Partial<SessionOptions & {
  cleanupLimit: number;
  limitSubquery: boolean;
  onError: OnCatchError;
  ttl: Ttl;
}>;

export class TypeormStore extends Store {
  private cleanupLimit?: number;
  private limitSubquery = true;
  private ttl?: Ttl;
  private onError?: OnCatchError;
  private repository!: Repository<Session>;

  constructor(options: SessionStoreOptions = {}) {
    super();
    this.cleanupLimit = options.cleanupLimit ?? 0;
    if (options.limitSubquery !== undefined) {
      this.limitSubquery = options.limitSubquery;
    }
    this.ttl = options.ttl;
    this.onError = options.onError;
  }

  connect(repository: Repository<Session>) {
    this.repository = repository;
    this.emit('connect');
    return this;
  }

  // Define the `get` method to retrieve a session by ID
  async get(sid: string, callback: CallbackFn): Promise<void> {
    console.log(`GET ${sid}`);

    try {
      // Try to find the session in the repository by ID
      const session = await this.repository.findOne({ where: { id: sid } });

      // If the session is not found, return the callback without an error or session data
      if (!session) {
        console.log(`Session not found for ${sid}`);
        return callback();
      }

      console.log(`GOT session data for ${sid}`);
      // Parse the session data from JSON and return it via the callback without an error
      const sessionData = JSON.parse(session.data);
      callback(null, sessionData);
    } catch (err) {
      // If an error occurs during the session retrieval, return the error via the callback and log it
      console.log(`Failed to get session data for ${sid}`);
      callback(err);
      this.handleError(err);
    }
  }

  // Define the `set` method to store a session by ID
  async set(sid: string, session: SessionData, callback?: CallbackFn): Promise<void> {
    try {
      // Convert the session data to JSON
      const data = JSON.stringify(session);

      // Determine the TTL (Time To Live) for the session based on the session data and ID
      const ttl = this.getTTL(session, sid);

      // Calculate the expiration time for the session based on the TTL and the current time
      const expiration = Date.now() + ttl * 1000;

      // Define the arguments for the Redis SET command that will be used to store the session data
      const args = ['EX', ttl.toString(), 'NX', sid, data];
      // await this.redisClient.setAsync(args);
      console.log(`SET "${sid}" ttl:${ttl}`);

      // Call the `cleanupExpiredSessions` helper function to remove expired sessions
      await this.cleanupExpiredSessions();

      // Try to find the session in the repository by ID, including deleted records
      const sessionRecord = await this.repository.findOne({ where: { id: sid }, withDeleted: true });
      //const sessionRecord = await this.repository.findOne({ where: { id: sid } });

      // If the session already exists in the repository, update its expiration and data fields
      if (sessionRecord) {
        await this.repository.update(
          { id: sid, deletedAt: IsNull() },
          { expiration, data }
        );
      } else {
        // If the session does not already exist in the repository, insert a new record for it
        await this.repository.insert({ id: sid, data, expiration });
      }

      console.log('SET complete');
      // If a callback function was provided, call it without an error
      if (callback) callback(null);
    } catch (err) {
      // If an error occurs during the session storage, return the error via the callback and log it
      if (callback) callback(err);
      this.handleError(err);
    }
  }

  // Deletes one or more session records from the database.
  async destroy(sid: string | string[], callback?: CallbackFn) {
    console.log(`Deleting session(s) "${sid}"`);
    try {
      // If sid is an array, use Promise.all to delete each session record one by one
      await Promise.all(
        (Array.isArray(sid) ? sid : [sid]).map((id) =>
          this.repository.softDelete(id)
          //this.repository.delete(id),
          //this.repository.update(id, { deletedAt: new Date() }),
        ),
      );
      console.log(`Session(s) "${sid}" deleted`);
      // Call the callback function (if provided) with no error
      if (callback) callback(null);
    } catch (err) {
      // If an error occurs, call the handleError method to handle it, and call the callback function with the error passed as an argument if provided
      if (callback) callback(err);
      this.handleError(err);
    }
  }

  // Updates the expiry time of a session identified by sid
  async touch(sid: string, session: SessionData, callback?: CallbackFn) {
    // Calculate the time-to-live (TTL) for the session
    const ttl = this.getTTL(session);

    if (session?.cookie?.expires) {
      console.log(`Skipping updating session "${sid}" expiration`);
      if (callback) callback();
      return;
    }

    console.log(`Updating session "${sid}" expiration (TTL: ${ttl}s)`);
    try {
      // Update the session's expiry time in the repository
      await this.repository.createQueryBuilder('session')
        .update({ expiration: Date.now() + ttl * 1000 })
        .whereInIds([sid])
        .execute();

      console.log(`Session "${sid}" expiration updated`);
      // Call the callback function (if provided) with no error
      callback && callback(null);
    } catch (err) {
      callback && callback(err);
      this.handleError(err);
    }
  }

  // Retrieves all active sessions from the repository.
  async getAllSessions(): Promise<SessionData[]> {
    try {
      // Retrieve all sessions with expiry time greater than current time
      const result = await this.repository.createQueryBuilder('session')
        .where('session.expiration > :expiration', { expiration: Date.now() })
        .getMany();

      // Map the results to an array of session data objects
      const sessions = result.map((session) => {
        const sess = JSON.parse(session.data);
        sess.id = session.id;
        return sess;
      });

      // Return the array of session data objects
      return sessions;
    } catch (err) {
      this.handleError(err);
    }
  }

  // Define a helper function to remove expired sessions
  private async cleanupExpiredSessions() {
    // If the cleanup limit is not set, do nothing
    if (!this.cleanupLimit) {
      return;
    }

    // Get a comma-separated string of expired session IDs from Redis
    const expiredSessionIds = await this.getExpiredSessionIds();

    if (expiredSessionIds) {
      // Split the comma-separated string of expired session IDs into an array
      const sessionIdsArray = expiredSessionIds.split(', ');

      // If there are any expired session IDs, delete them from the repository
      if (sessionIdsArray.length > 0 && expiredSessionIds !== 'NULL') {
        await this.repository.delete({ id: In(sessionIdsArray) });
      }
    }
  }

  // Retrieves the IDs of all expired sessions from the repository.
  private async getExpiredSessionIds() {
    try {
      // Retrieve expired session IDs from the repository
      const expiredSessions = await this.repository.createQueryBuilder('session')
        .withDeleted()
        .select('session.id')
        .where('session.expiration <= :now', { now: Date.now() })
        //.andWhere('session.deletedAt IS NULL')
        .limit(this.cleanupLimit)
        .getMany();

      // Join the IDs into a comma-separated string
      if (this.limitSubquery) {
        return expiredSessions
          .map((session) => `'${session.id.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`)
          .join(', ');
      } else {
        return expiredSessions
          .map((session) => session.id)
          .join(', ') || 'NULL';
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  // Calculates the time-to-live (TTL) for a session based on the session data and configuration settings.
  private getTTL(session: SessionData, sid?: string) {
    // If TTL is a number, return it
    if (typeof this.ttl === 'number') {
      return this.ttl;
    }

    // If TTL is a function, call it with this instance, session data, and session ID (if provided)
    if (typeof this.ttl === 'function') {
      return this.ttl(this, session, sid);
    }

    // If TTL is not a number or function, calculate it based on the session cookie's maxAge value or set it to 1 day by default
    const maxAge = session.cookie.maxAge;
    const oneDay = 86400;
    return typeof maxAge === 'number' ? Math.floor(maxAge / 1000) : oneDay;
  }

  // Handles errors that occur during session management operations.
  private handleError(err: Error) {
    // If an error handling function is provided, call it with this instance and the error object
    if (this.onError) {
      this.onError(this, err);
    } else {
      // If no error handling function is provided, emit a 'disconnect' event with the error object
      this.emit('disconnect', err);
    }
  }
}

// inspired connect-typeorm
