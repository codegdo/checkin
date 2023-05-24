import { SessionData, SessionOptions, Store } from "express-session";
import { Cache } from 'cache-manager';

type Serializer = {
  parse(s: string): SessionData | Promise<SessionData>
  stringify(s: SessionData): string
}

type CallbackFn = (error?: Error | null, session?: SessionData | null) => void;

type RedisStoreOptions = Partial<SessionOptions & {
  prefix?: string;
  serializer?: Serializer;
  ttl?: number | ((sess: SessionData) => number);
  disableTTL?: boolean;
  disableTouch?: boolean;
}>;

const noop = (err?: unknown, data?: any) => {}

export class RedisStore extends Store {
  private prefix: string;
  private serializer: Serializer;
  private ttl: number | ((sess: SessionData) => number);
  private disableTTL: boolean;
  private disableTouch: boolean;
  private cacheManager!: Cache;

  constructor(opts: RedisStoreOptions) {
    super();
    this.prefix = opts.prefix == null ? "sess:" : opts.prefix
    this.serializer = opts.serializer || JSON;
    this.ttl = opts.ttl || 86400; // One day in seconds.
    this.disableTTL = opts.disableTTL || false;
    this.disableTouch = opts.disableTouch || false;
  }

  connect(cacheManager) {
    this.cacheManager = cacheManager;
    this.emit('connect');
    return this;
  }

  // Define the `get` method to retrieve a session by ID
  async get(sid: string, callback?: CallbackFn): Promise<void> {
    console.log('GET', sid);

    let key = this.prefix + sid;

    try {
      let session = await this.cacheManager.get(key);
      if (!session) return callback();
      return callback(null, await this.serializer.parse(session as string))
    } catch (err) {
      return callback(err)
    }
  }

  // Define the `set` method to store a session by ID
  async set(sid: string, session: SessionData, callback?: CallbackFn): Promise<void> {
    console.log('SET', sid);

    let key = this.prefix + sid;
    let ttl = this.getTTL(session);

    try {
      let val = this.serializer.stringify(session);

      if (ttl > 0) {
        await this.cacheManager.set(key, val, ttl)
        return callback(null);
      } else {
        return this.destroy(sid, callback);
      }
    } catch (err) {
      return callback(err);
    }

  }

  // Deletes one or more session records from the database.
  async destroy(sid: string | string[], callback?: CallbackFn) {
    console.log('DESTROY');
    
    try {
      await Promise.all(
        (Array.isArray(sid) ? sid : [sid]).map((id) =>
          this.cacheManager.del(this.prefix + id)
        ),
      );
      return callback()
    } catch (err) {
      return callback(err)
    }
  }

  // Calculates the time-to-live (TTL) for a session based on the session data and configuration settings.
  private getTTL(session: SessionData) {
    if (typeof this.ttl === 'number') {
      return this.ttl;
    }

    if (typeof this.ttl === 'function') {
      return this.ttl(session);
    }

    // If TTL is not a number or function, calculate it based on the session cookie's maxAge value or set it to 1 day by default
    const maxAge = session.cookie.maxAge;
    const oneDay = 86400;
    return typeof maxAge === 'number' ? Math.floor(maxAge / 1000) : oneDay;
  }
}