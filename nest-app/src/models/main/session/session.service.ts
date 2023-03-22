
import { LessThan, Repository } from 'typeorm';
import { Store, SessionData, SessionOptions } from 'express-session';
import { Session } from './session.entity';

export type Ttl = number | ((store: SessionService, session: SessionData, sid?: string) => number);

type SessionServiceOptions = Partial<
  SessionOptions & {
    cleanupLimit: number;
    limitSubquery: boolean;
    onError: (s: SessionService, e: Error) => void;
    ttl: Ttl;
    maxAge?: number;
  }
>;

export class SessionService extends Store {
  private cleanupLimit?: number;
  private limitSubquery?: boolean = true;
  private repository!: Repository<Session>;
  private ttl?: Ttl;
  private onError?: (store: SessionService, error: Error) => void;
  private maxAge?: number;

  constructor(options: SessionServiceOptions = {}) {
    super(options as any);
    this.cleanupLimit = options.cleanupLimit;
    this.limitSubquery = options.limitSubquery ?? this.limitSubquery;
    this.ttl = options.ttl;
    this.onError = options.onError;
    this.maxAge = options.maxAge;
  }

  connect(repository: Repository<Session>): this {
    this.repository = repository;
    this.emit('connect');
    return this;
  }

  async get(sid: string, callback: (err: any, session?: SessionData) => void): Promise<void> {
    try {
      const session = await this.repository.findOne({ where: { id: sid } });

      if (!session) {
        return callback(null);
      }

      const data = JSON.parse(session.data);
      callback(null, data);
    } catch (err) {
      callback(err);
      this.handleError(err);
    }
  }

  async set(sid: string, session: SessionData, callback?: (err?: any) => void): Promise<void> {
    const data = JSON.stringify(session);
    const ttl = this.getTTL(session, sid);
    const expiredAt = Date.now() + ttl * 1000;

    try {
      const existingSession = await this.repository.findOne({ where: { id: sid }, withDeleted: true });

      if (existingSession) {
        await this.repository.update(
          { id: sid },
          { expiredAt, data },
        );
      } else {
        await this.repository.insert({ id: sid, expiredAt, data });
      }

      callback?.();
    } catch (err) {
      callback?.(err);
      this.handleError(err);
    }

    if (this.cleanupLimit) {
      await this.cleanupExpiredSessions();
    }
  }

  async destroy(sid: string, callback?: (err?: any) => void): Promise<void> {
    try {
      await this.repository.delete(sid);
      callback?.();
    } catch (err) {
      callback?.(err);
      this.handleError(err);
    }
  }

  async touch(sid: string, session: SessionData, callback?: (err?: any) => void): Promise<void> {
    const ttl = this.getTTL(session);
    const expiredAt = Date.now() + ttl * 1000;

    try {
      await this.repository.update(
        { id: sid },
        { expiredAt },
      );

      callback?.();
    } catch (err) {
      callback?.(err);
      this.handleError(err);
    }
  }

  async all(callback: (err: any, sessions?: SessionData[]) => void): Promise<void> {
    try {
      const sessions = await this.repository.find();
      const data = sessions.map((session) => JSON.parse(session.data));
      callback(null, data);
    } catch (err) {
      callback(err);
      this.handleError(err);
    }
  }

  private async cleanupExpiredSessions() {
    const maxAge = this.maxAge;
    const expiredAt = Date.now() - maxAge * 1000;

    await this.repository.delete({
      expiredAt: LessThan(expiredAt),
    });
  }

  private getTTL(session: SessionData, sid?: string) {
    if (typeof this.ttl === 'number') {
      return this.ttl;
    }
    if (typeof this.ttl === 'function') {
      return this.ttl(this, session, sid);
    }
    const maxAge = session.cookie.maxAge;
    return typeof maxAge === 'number' ? Math.floor(maxAge / 1000) : this.maxAge;
  }

  private handleError(error: Error) {
    if (this.onError) {
      this.onError(this, error);
    } else {
      throw error;
    }
  }
}


/*

  async getSessionData(sid: string): Promise<SessionData | null> {
    try {
      const result = await this.createQueryBuilder()
        .andWhere('session.id = :id', { id: sid })
        .getOne();
  
      if (!result) {
        return null;
      }
  
      return JSON.parse(result.data);
    } catch (err) {
      this.handleError(err);
      throw err;
    }
  }
  
  async getAsync(sid: string): Promise<SessionData | null> {
    try {
      const sessionData = await getSessionData.call(this, sid);
      return sessionData;
    } catch (err) {
      return null;
    }
  }

  async setAsync(sid: string, session: SessionData): Promise<void> {
    const args = [sid];
    let data: string;
  
    try {
      data = JSON.stringify(session);
    } catch (err) {
      throw err;
    }
  
    args.push(data);
  
    const ttl = this.getTTL(session, sid);
    args.push('EX', ttl.toString());
  
    if (this.cleanupLimit) {
      const sessionIds = await this.getSessionIds();
  
      try {
        await this.repository
          .createQueryBuilder('session')
          .delete()
          .where(`id IN (${sessionIds})`)
          .execute();
      } catch (err) {
        console.log(err);
      }
    }
  
    try {
      await this.repository.update(
        {
          //destroyedAt: null,
          id: sid,
        },
        {
          expiredAt: Date.now() + ttl * 1000,
          id: sid,
          data,
        },
      );
    } catch (err) {
      try {
        await this.repository.insert({
          expiredAt: Date.now() + ttl * 1000,
          id: sid,
          data,
        });
      } catch (err) {
        throw err;
      }
    }
  }
*/