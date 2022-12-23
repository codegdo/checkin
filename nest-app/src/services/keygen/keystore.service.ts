import { Injectable } from '@nestjs/common';
import * as jose from 'node-jose';
import * as jwktopem from 'jwk-to-pem';

import { KeyGenService, KeyStore } from './keygen.service';

@Injectable()
export class KeyStoreService implements KeyGenService {
  async extract(data: string): Promise<KeyStore> {
    const keyStore = await jose.JWK.asKeyStore(data);

    const { keys: privateKeys } = keyStore.toJSON(true);
    const { keys: publicKeys } = keyStore.toJSON();

    return {
      keyStore: data,
      privateKey: jwktopem(privateKeys[0], { private: true }),
      publicKey: jwktopem(publicKeys[0]),
    };
  }

  async generate(): Promise<KeyStore> {
    const keyStore = jose.JWK.createKeyStore();
    await keyStore.generate('RSA', 2048, { alg: 'RS256', use: 'sig' });

    const { keys: privateKeys } = keyStore.toJSON(true);
    const { keys: publicKeys } = keyStore.toJSON();

    return {
      keyStore: JSON.stringify(keyStore.toJSON(true)),
      privateKey: jwktopem(privateKeys[0], { private: true }),
      publicKey: jwktopem(publicKeys[0]),
    };
  }
}
