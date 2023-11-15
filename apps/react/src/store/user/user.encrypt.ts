import { createTransform } from 'redux-persist';
import { UserData } from './user.type';
import Aes from 'crypto-js/aes.js';
import Utf8 from 'crypto-js/enc-utf8';

const secretKey = 'your-super-secret-key';

const userEncryptionTransform = createTransform<UserData, string>(
  (inboundState, key) => {
    if (key === 'status' || key === 'user') {
      const encrypted = Aes.encrypt(JSON.stringify(inboundState), secretKey).toString();
      return encrypted;
    }

    return inboundState;
  },
  (outboundState, key) => {
    if (key === 'status' || key === 'user' && typeof outboundState === 'string') {
      const decrypted = Aes.decrypt(outboundState, secretKey).toString(Utf8);
      return JSON.parse(decrypted);
    }

    return outboundState;
  }
);

export default userEncryptionTransform;
