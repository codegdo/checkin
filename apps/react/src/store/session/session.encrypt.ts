import { createTransform } from 'redux-persist';
import utils from '@/utils';
import { ENCRYPT_KEY } from '@/app.constant';

const encryptedSession = createTransform(
  (inboundState, key) => {
    if (key === 'session') {
      const encrypted = utils.encrypt(JSON.stringify(inboundState), ENCRYPT_KEY);
      return encrypted;
    }

    return inboundState;
  },
  (outboundState, key) => {
    if (key === 'session' && typeof outboundState === 'string') {
      const decrypted = utils.decrypt(outboundState, ENCRYPT_KEY, '{"status":');
      return JSON.parse(decrypted);
    }

    return outboundState;
  }
);

export default encryptedSession;
