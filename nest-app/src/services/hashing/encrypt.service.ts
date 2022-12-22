import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';

import { randomBytes, scrypt as scrypto } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(scrypto);

@Injectable()
export class EncryptService implements HashingService {
  async hash(data: string | Buffer): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(data, salt, 32)) as Buffer;
    return hash.toString('hex') + '.' + salt;
  }

  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    const [hashedData, salt] = encrypted.split('.');
    const hash = (await scrypt(data, salt, 32)) as Buffer;
    return hashedData === hash.toString('hex');
  }
}
