import { SessionData, SessionOptions, Store } from "express-session";
import { Cache } from 'cache-manager';

type Serializer = {
  parse(s: string): SessionData | Promise<SessionData>;
  stringify(s: SessionData): string;
};

type CallbackFn = (error?: Error | null, session?: SessionData | null) => void;

type RedisStoreOptions = Partial<SessionOptions & {
  prefix?: string;
  serializer?: Serializer;
  scanCount?: number;
  ttl?: number | ((sess: SessionData) => number);
  disableTTL?: boolean;
  disableTouch?: boolean;
}>;

export class RedisStore extends Store {
  private prefix: string;
  private serializer: Serializer;
  private ttl: number | ((sess: SessionData) => number);
  private disableTTL: boolean;
  private disableTouch: boolean;
  private cacheManager!: Cache;

  constructor(opts: RedisStoreOptions) {
    super();
    this.prefix = opts.prefix ?? "sess:";
    this.serializer = opts.serializer ?? JSON;
    this.ttl = opts.ttl ?? 86400; // One day in seconds.
    this.disableTTL = opts.disableTTL ?? false;
    this.disableTouch = opts.disableTouch ?? false;
  }

  connect(cacheManager: Cache): this {
    this.cacheManager = cacheManager;
    this.emit('connect');
    return this;
  }

  async get(sid: string, callback?: CallbackFn): Promise<void> {
    console.log('GET', sid);

    const key = this.prefix + sid;

    try {
      const session = await this.cacheManager.get(key);
      if (!session) return callback?.();
      return callback?.(null, await this.serializer.parse(session as string));
    } catch (err) {
      return callback?.(err);
    }
  }

  async set(sid: string, session: SessionData, callback?: CallbackFn): Promise<void> {
    console.log('SET', sid);

    const key = this.prefix + sid;
    const ttl = this.getTTL(session);

    try {
      const val = this.serializer.stringify(session);

      if (ttl > 0) {
        await this.cacheManager.set(key, val, ttl);
        return callback?.(null);
      } else {
        return this.destroy(sid, callback);
      }
    } catch (err) {
      return callback?.(err);
    }
  }

  async destroy(sid: string | string[], callback?: CallbackFn): Promise<void> {
    console.log('DESTROY');

    try {
      await Promise.all(
        (Array.isArray(sid) ? sid : [sid]).map((id) =>
          this.cacheManager.del(this.prefix + id)
        )
      );
      return callback?.();
    } catch (err) {
      return callback?.(err);
    }
  }

  async touch(sid: string, sess: SessionData, callback: CallbackFn): Promise<void> {
    console.log('TOUCH', sid);

    if (this.disableTouch || this.disableTTL) {
      return callback?.();
    }
  
    const key = this.prefix + sid;
    const ttl = this.getTTL(sess);
  
    try {
      const val = await this.cacheManager.get(key);
      if (!val) {
        // Session doesn't exist, return early
        return callback?.();
      }
      await this.cacheManager.set(key, val, ttl);
      return callback?.();
    } catch (err) {
      return callback?.(err);
    }
  }

  async length(callback: (error?: Error | null, length?: number) => void) {
    try {
      let keys = await this.getAllKeys();
      return callback?.(null, keys.length);
    } catch (err) {
      return callback?.(err);
    }
  }

  async ids(callback: (error?: Error | null, length?: number) => void) {
    const len = this.prefix.length;
  
    try {
      const keys = await this.getAllKeys();
      const ids = keys.map((k) => k.substring(len));
      return callback?.(null, ids.length);
    } catch (err) {
      return callback?.(err);
    }
  }

  async all(callback: (err: any, obj?: SessionData[] | { [sid: string]: SessionData }) => void) {
    let len = this.prefix.length;
    try {
      let keys = await this.getAllKeys();
      if (keys.length === 0) return callback?.(null, []);
  
      const store = await this.cacheManager.store;
      let data = await store.mget(...keys);
      let results = data.reduce((acc: SessionData[], raw: unknown, idx: number) => {
        if (!raw) return acc;
        let sess = this.serializer.parse(String(raw)) as any;
        sess.id = keys[idx].substring(len);
        acc.push(sess);
        return acc;
      }, [] as SessionData[]);
  
      return callback?.(null, results as SessionData[]);
    } catch (err) {
      return callback?.(err);
    }
  }

  // async all(callback: (err: any, obj?: SessionData[] | { [sid: string]: SessionData }) => void) {
  //   const len = this.prefix.length;
  
  //   try {
  //     const keys = await this.getAllKeys();
  //     if (keys.length === 0) return callback?.(null, []);
  
  //     const dataPromises = keys.map((key) => this.cacheManager.get(key));
  //     const data = await Promise.all(dataPromises);
  
  //     const results: { [sid: string]: SessionData & { id: string } } = {};
  
  //     keys.forEach((key, idx) => {
  //       const raw = data[idx] as string;
  //       if (raw) {
  //         const sess = this.serializer.parse(raw) as SessionData;
  //         const id = key.substring(len) as string;
  //         results[id] = { ...sess, id };
  //       }
  //     });
  
  //     return callback?.(null, results);
  //   } catch (err) {
  //     return callback?.(err);
  //   }
  // }

  private getTTL(session: SessionData): number {
    if (typeof this.ttl === 'number') {
      return this.ttl;
    }

    if (typeof this.ttl === 'function') {
      return this.ttl(session);
    }

    const maxAge = session.cookie.maxAge;
    const oneDay = 86400;
    return typeof maxAge === 'number' ? Math.floor(maxAge / 1000) : oneDay;
  }

  // private async getAllKeys(): Promise<string[]> {
  //   const pattern = this.prefix + '*';
  
  //   try {
  //     const store = this.cacheManager.store; // Replace 'any' with the appropriate store type
  //     const allKeys = await store.keys(pattern);
  //     return allKeys;
  //   } catch (err) {
  //     console.error('Error retrieving keys:', err);
  //     return [];
  //   }
  // }

  private async getAllKeys(): Promise<string[]> {
    const pattern = this.prefix + '*';
    const keys: string[] = [];
  
    try {
      const allKeys = await this.cacheManager.store.keys(pattern);
      keys.push(...allKeys);
    } catch (err) {
      console.error('Error retrieving keys:', err);
    }
  
    return keys;
  }

  // private async getAllKeys(): Promise<string[]> {
  //   const pattern = this.prefix + '*';
  //   const keys: string[] = [];
  
  //   return new Promise<string[]>((resolve, reject) => {
  //     const stream = this.redisClient.scanStream({
  //       match: pattern,
  //       count: this.scanCount,
  //     });
  
  //     stream.on('data', (dataKeys: string[]) => {
  //       keys.push(...dataKeys);
  //     });
  
  //     stream.on('end', () => {
  //       resolve(keys);
  //     });
  
  //     stream.on('error', (error: Error) => {
  //       reject(error);
  //     });
  //   });
  // }
}
