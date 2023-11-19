import { createTransform } from 'redux-persist';
import { decrypt, encrypt } from '@/utils';
import { ENCRYPT_KEY } from '@/app.constant';

const encryptedCompany = createTransform(
  (inboundState, key) => {
    if (key === 'company') {
      const encrypted = encrypt(JSON.stringify(inboundState), ENCRYPT_KEY);
      return encrypted;
    }

    return inboundState;
  },
  (outboundState, key) => {
    if (key === 'company' && typeof outboundState === 'string') {
      const decrypted = decrypt(outboundState, ENCRYPT_KEY, '{"id":');
      return JSON.parse(decrypted);
    }

    return outboundState;
  }
);

export default encryptedCompany;
