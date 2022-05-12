import * as jose from 'node-jose';
import * as jwktopem from 'jwk-to-pem';

export const getKeyStore = async (key?: string) => {

  const keyStore = await jose.JWK.asKeyStore(key);

  const { keys: privateKeys } = keyStore.toJSON(true);
  const { keys: publicKeys } = keyStore.toJSON();

  return {
    privateKey: jwktopem(privateKeys[0], { private: true }),
    publicKey: jwktopem(publicKeys[0])
  }
}

export const createKeyStore = async () => {
  const keyStore = jose.JWK.createKeyStore();
  await keyStore.generate('RSA', 2048, { alg: 'RS256', use: 'sig' });

  const { keys: privateKeys } = keyStore.toJSON(true);
  const { keys: publicKeys } = keyStore.toJSON();

  return {
    privateKey: jwktopem(privateKeys[0], { private: true }),
    publicKey: jwktopem(publicKeys[0])
  }
}