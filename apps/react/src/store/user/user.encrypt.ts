import { createTransform } from 'redux-persist';
import utils from '@/utils';
import { ENCRYPT_KEY } from '@/app.constant';

const encryptedUser = createTransform(
  (inboundState, key) => {
    if (key === 'user') {
      const encrypted = utils.encrypt(JSON.stringify(inboundState), ENCRYPT_KEY);
      return encrypted;
    }

    return inboundState;
  },
  (outboundState, key) => {
    if (key === 'user' && typeof outboundState === 'string') {
      const decrypted = utils.decrypt(outboundState, ENCRYPT_KEY, '{"firstName":');
      return JSON.parse(decrypted);
    }

    return outboundState;
  }
);

export default encryptedUser;
