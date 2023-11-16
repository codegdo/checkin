import { createTransform } from 'redux-persist';
import Aes from 'crypto-js/aes.js';
import Utf8 from 'crypto-js/enc-utf8';

const secretKey = 'your-super-secret-key';

const encryptionTransforms = createTransform<any, string>(
  (inboundState, key) => {
    if (key === 'session') {
      const encrypted = Aes.encrypt(JSON.stringify(inboundState), secretKey).toString();
      return encrypted;
    }

    return inboundState;
  },
  (outboundState, key) => {
    if (key === 'session' && typeof outboundState === 'string') {
      const decrypted = Aes.decrypt(outboundState, secretKey).toString(Utf8);
      return JSON.parse(decrypted);
    }

    return outboundState;
  }
);

export default encryptionTransforms;
