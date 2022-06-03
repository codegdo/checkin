import { SessionData, SessionOptions, Store } from 'express-session';
import { Repository } from 'typeorm';

export type ISession = {
  id: string;
  expiredAt: number;
  destroyedAt?: Date;
  json: string;
}

export type Ttl = | number | ((store: SessionStore, session: SessionData, sid?: string) => number);

type SessionStoreOptions = Partial<SessionOptions & {
  cleanupLimit: number;
  limitSubquery: boolean;
  onError: (s: SessionStore, e: Error) => void;
  ttl: Ttl;
}>

export class SessionStore extends Store {
  private cleanupLimit: number | undefined;
  private limitSubquery = true;
  private repository!: Repository<ISession>;
  private ttl: Ttl | undefined;
  private onError: ((s: SessionStore, e: Error) => void) | undefined;

  constructor(options: SessionStoreOptions = {}) {
    super(options as any);
    this.cleanupLimit = options?.cleanupLimit;
    this.limitSubquery = options?.limitSubquery;
    this.ttl = options?.ttl;
    this.onError = options?.onError;
  }

  connect(repository: Repository<ISession>) {
    this.repository = repository;
    this.emit('connect');
    return this;
  }

  async get(sid: string, callback: (err: any, session?: SessionData) => void) {
    try {
      const result = await this.createQueryBuilder()
        .andWhere('session.id = :id', { id: sid })
        .getOne();

      if (!result) {
        return callback(null);
      }

      callback(null, JSON.parse(result.json));

    } catch (err) {
      callback(err);
      this.handleError(err);
    }
  }

  async set(sid: string, session: SessionData, callback?: (err?: any) => void) {
    const args = [sid];
    let json: string;

    try {
      json = JSON.stringify(session);
    } catch (err) {
      return callback && callback(err);
    }

    args.push(json);

    const ttl = this.getTTL(session, sid);
    args.push("EX", ttl.toString());

    if (this.cleanupLimit) {
      const sessionIds = await this.getSessionIds();
      try {
        await this.createQueryBuilder()
          .delete()
          .where(`id IN (${sessionIds})`)
          .execute();
      } catch (err) {
        callback && callback(err);
        this.handleError(err);
      }
    }

    try {
      await this.repository.findOneOrFail({ where: { id: sid }, withDeleted: true });
      await this.repository.update({
        destroyedAt: null,
        id: sid
      }, {
        expiredAt: Date.now() + ttl * 1000,
        id: sid,
        json
      });
      callback && callback();
    } catch (err) {
      try {
        await this.repository.insert({
          expiredAt: Date.now() + ttl * 1000,
          id: sid,
          json,
        });
        callback && callback();
      } catch (err) {
        callback && callback(err);
        this.handleError(err);
      }
    }
  }

  async destroy(sid: string, callback?: (err?: any) => void) {
    try {
      await Promise.all((Array.isArray(sid) ? sid : [sid]).map((x) => this.repository.softDelete({ id: x })));
      callback && callback();
    } catch (err) {
      callback && callback(err);
      this.handleError(err);
    }
  }

  async touch(sid: string, session: SessionData, callback?: (err?: any) => void) {
    const ttl = this.getTTL(session);
    try {
      await this.repository
        .createQueryBuilder('session')
        .update({ expiredAt: Date.now() + ttl * 1000 })
        .whereInIds([sid])
        .execute();

      callback && callback(null);
    } catch (err) {
      callback && callback(err);
      this.handleError(err);
    }
  }

  async all(callback: (err: any, sessions?: SessionData[]) => void) {
    try {
      const result = await this.createQueryBuilder().getMany();
      const sessions = result.map(session => {
        const sess = JSON.parse(session.json);
        sess.id = session.id;
        return sess;
      })
      callback(null, sessions);
    } catch (err) {
      callback(err, null);
      this.handleError(err);
    }

  }

  private createQueryBuilder() {
    return this.repository
      .createQueryBuilder('session')
      .where('session.expiredAt > :expiredAt', { expiredAt: Date.now() })
  }

  private async getSessionIds() {
    try {
      const q = await this.repository
        .createQueryBuilder('session')
        .withDeleted()
        .select('session.id')
        .where(`session.expiredAt <= ${Date.now()}`)
        .limit(this.cleanupLimit);

      if (this.limitSubquery) {
        return q.getQuery();
      } else {
        const result = await q.getMany();

        return result.map((item) => {
          const { id } = item;

          if (id === 'string') {
            return `${id.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}`;
          } else {
            return `${id}`;
          }
        }).join(', ') || 'NULL';
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  private getTTL(session: SessionData, sid?: string) {
    if (typeof this.ttl === "number") { return this.ttl; }
    if (typeof this.ttl === "function") { return this.ttl(this, session, sid); }

    const maxAge = session.cookie.maxAge;
    const oneDay = 86400;

    return (typeof maxAge === "number"
      ? Math.floor(maxAge / 1000)
      : oneDay);
  }

  private handleError(err: Error) {
    console.log('handleError');
    if (this.onError) {
      this.onError(this, err);
    } else {
      this.emit('disconnect', err);
    }
  }
}