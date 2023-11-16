import { createTransform } from 'redux-persist';
import { decrypt, encrypt } from '@/utils';

const secretKey = 'your-super-secret-key';

const encryptedSession = createTransform(
  (inboundState, key) => {
    if (key === 'session') {
      const encrypted = encrypt(JSON.stringify(inboundState), secretKey);
      return encrypted;
    }

    return inboundState;
  },
  (outboundState, key) => {
    if (key === 'session' && typeof outboundState === 'string') {
      const decrypted = decrypt(outboundState, secretKey, '{"appId":');
      return JSON.parse(decrypted);
    }

    return outboundState;
  }
);

export default encryptedSession;
