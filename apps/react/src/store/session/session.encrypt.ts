import { createTransform } from 'redux-persist';
import { decrypt, encrypt } from '@/utils';
import { ENCRYPT_KEY } from '@/app.constant';

const encryptedSession = createTransform(
  (inboundState, key) => {
    if (key === 'session') {
      const encrypted = encrypt(JSON.stringify(inboundState), ENCRYPT_KEY);
      return encrypted;
    }

    return inboundState;
  },
  (outboundState, key) => {
    if (key === 'session' && typeof outboundState === 'string') {
      const decrypted = decrypt(outboundState, ENCRYPT_KEY, '{"status":');
      return JSON.parse(decrypted);
    }

    return outboundState;
  }
);

export default encryptedSession;
