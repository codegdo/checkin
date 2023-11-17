import { createTransform } from 'redux-persist';
import { decrypt, encrypt } from '@/utils';
import { ENCRYPT_KEY } from '@/app.constant';

const encryptedUser = createTransform(
  (inboundState, key) => {
    if (key === 'user') {
      const encrypted = encrypt(JSON.stringify(inboundState), ENCRYPT_KEY);
      return encrypted;
    }

    return inboundState;
  },
  (outboundState, key) => {
    if (key === 'user' && typeof outboundState === 'string') {
      const decrypted = decrypt(outboundState, ENCRYPT_KEY, '{"id":');
      return JSON.parse(decrypted);
    }

    return outboundState;
  }
);

export default encryptedUser;
