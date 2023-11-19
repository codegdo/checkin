import { createTransform } from 'redux-persist';
import { decrypt, encrypt } from '@/utils';
import { ENCRYPT_KEY } from '@/app.constant';

const encrypted = createTransform(
  (inboundState, key) => {
    if (!inboundState) return inboundState;
    const stringifyState = JSON.stringify(inboundState);

    if(key === 'session' || key === 'model' || key === 'company' || key === 'user') {
      return encrypt(stringifyState, ENCRYPT_KEY);
    }
    
    return inboundState;
  },
  (outboundState, key) => {
    if (!outboundState) return outboundState;

    if (typeof outboundState === 'string') {
      if(key === 'session') {
        const decrypted = decrypt(outboundState, ENCRYPT_KEY, '{"status":');
        return JSON.parse(decrypted);
      }

      if(key === 'model') {
        const decrypted = decrypt(outboundState, ENCRYPT_KEY, '{"app":');
        return JSON.parse(decrypted);
      }

      if(key === 'company') {
        const decrypted = decrypt(outboundState, ENCRYPT_KEY, '{"id":');
        return JSON.parse(decrypted);
      }

      if(key === 'user') {
        const decrypted = decrypt(outboundState, ENCRYPT_KEY, '{"firstName":');
        return JSON.parse(decrypted);
      }

      // if(key === 'theme') {
      //   const decrypted = decrypt(outboundState, ENCRYPT_KEY, '{');
      //   return JSON.parse(decrypted);
      // }
    }

    return outboundState;
  }
);

export default encrypted;
