import { createTransform } from 'redux-persist';
import { decrypt, encrypt } from '@/utils';
import { ENCRYPT_KEY } from '@/app.constant';

const encryptedModel = createTransform(
  (inboundState, key) => {
    if (key === 'model') {
      const encrypted = encrypt(JSON.stringify(inboundState), ENCRYPT_KEY);
      return encrypted;
    }

    return inboundState;
  },
  (outboundState, key) => {
    if (key === 'model' && typeof outboundState === 'string') {
      const decrypted = decrypt(outboundState, ENCRYPT_KEY, '{"app":');
      return JSON.parse(decrypted);
    }

    return outboundState;
  }
);

export default encryptedModel;