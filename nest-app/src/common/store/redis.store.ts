import { SessionData, SessionOptions, Store } from "express-session";
import { Cache } from 'cache-manager';
import { Injectable } from "@nestjs/common";

type Serializer = {
  parse(s: string): SessionData | Promise<SessionData>
  stringify(s: SessionData): string
}

type CallbackFn = (error?: Error | null, session?: SessionData | null) => void;

type RedisStoreOptions = Partial<SessionOptions & {
  prefix?: string;
  serializer?: Serializer;
  ttl?: number | { (sess: SessionData): number };
  disableTTL?: boolean;
  disableTouch?: boolean;
}>;

export class RedisStore extends Store {
  private prefix: string;
  private serializer: Serializer;
  private ttl: number | { (sess: SessionData): number };
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
    console.log('GET');
    return callback();
  }

  // Define the `set` method to store a session by ID
  async set(sid: string, session: SessionData, callback?: CallbackFn): Promise<void> {
    console.log('SET', sid);
    await this.cacheManager.set(sid, 'hello cache');

    let key = this.prefix + sid;

    try {
      let val = this.serializer.stringify(session);
      return callback();
    } catch (err) {
      return callback(err);
    }

  }

  // Deletes one or more session records from the database.
  async destroy(sid: string | string[], callback?: CallbackFn) {
    console.log('DESTROY');
    return callback();
  }


}