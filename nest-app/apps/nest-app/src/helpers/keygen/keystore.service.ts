import { Injectable } from '@nestjs/common';
import * as jose from 'node-jose';
import * as jwktopem from 'jwk-to-pem';

import { KeyGenService, KeyStore } from './keygen.service';

@Injectable()
export class KeyStoreService implements KeyGenService {
  async extract(data: string): Promise<KeyStore> {
    const keyStore = await jose.JWK.asKeyStore(data);

    const { keys } = keyStore.toJSON(true);

    const [privateKey] = keys.filter((key) => key.use === 'sig' && key.kty === 'RSA');
    const [publicKey] = keys.filter((key) => key.use === 'sig' && key.kty === 'RSA' && !key.private);

    return {
      keyStore: data,
      privateKey: jwktopem(privateKey, { private: true }),
      publicKey: jwktopem(publicKey),
    };
  }

  async generate(): Promise<KeyStore> {
    const key = await jose.JWK.createKey('RSA', 2048, { alg: 'RS256', use: 'sig' });

    const { publicKey, privateKey } = key.toPEM(true);

    return {
      keyStore: JSON.stringify(key.toJSON(true)),
      privateKey,
      publicKey,
    };
  }
}

