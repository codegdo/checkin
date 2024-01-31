import { createTransform } from 'redux-persist';
import utils from '@/utils';
import { ENCRYPT_KEY } from '@/constants';

const encryptedModel = createTransform(
  (inboundState, key) => {
    if (key === 'model') {
      const encrypted = utils.encrypt(JSON.stringify(inboundState), ENCRYPT_KEY);
      return encrypted;
    }

    return inboundState;
  },
  (outboundState, key) => {
    if (key === 'model' && typeof outboundState === 'string') {
      const decrypted = utils.decrypt(outboundState, ENCRYPT_KEY, '{"app":');
      return JSON.parse(decrypted);
    }

    return outboundState;
  }
);

export default encryptedModel;