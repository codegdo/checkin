import { Injectable } from '@nestjs/common';

export interface KeyStore {
  keyStore: string;
  privateKey: string;
  publicKey: string;
}

@Injectable()
export abstract class KeyGenService {
  abstract extract(data: string): Promise<KeyStore>;
  abstract generate(): Promise<KeyStore>;
}
