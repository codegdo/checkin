import { createTransform } from 'redux-persist';
import utils from '@/utils';
import { ENCRYPT_KEY } from '@/app.constant';

const encryptedAccount = createTransform(
  (inboundState, key) => {
    if (key === 'account') {
      const encrypted = utils.encrypt(JSON.stringify(inboundState), ENCRYPT_KEY);
      return encrypted;
    }

    return inboundState;
  },
  (outboundState, key) => {
    if (key === 'account' && typeof outboundState === 'string') {
      const decrypted = utils.decrypt(outboundState, ENCRYPT_KEY, '{"id":');
      return JSON.parse(decrypted);
    }

    return outboundState;
  }
);

export default encryptedAccount;
