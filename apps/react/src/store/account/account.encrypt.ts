import { createTransform } from 'redux-persist';
import { decrypt, encrypt } from '@/utils';
import { ENCRYPT_KEY } from '@/app.constant';

const encryptedAccount = createTransform(
  (inboundState, key) => {
    if (key === 'account') {
      const encrypted = encrypt(JSON.stringify(inboundState), ENCRYPT_KEY);
      return encrypted;
    }

    return inboundState;
  },
  (outboundState, key) => {
    if (key === 'account' && typeof outboundState === 'string') {
      const decrypted = decrypt(outboundState, ENCRYPT_KEY, '{"id":');
      return JSON.parse(decrypted);
    }

    return outboundState;
  }
);

export default encryptedAccount;
