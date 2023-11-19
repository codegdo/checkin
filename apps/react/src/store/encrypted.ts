import { createTransform } from 'redux-persist';
import { decrypt, encrypt } from '@/utils';
import { ENCRYPT_KEY } from '@/app.constant';

const encrypted = createTransform(
  // Transform state before storing in storage
  (inboundState, key) => {
    if (!inboundState) return inboundState;
    const stringifyState = JSON.stringify(inboundState);
    const stringKey = String(key);
    
    // Encrypt specific parts of the state
    if (['session', 'model', 'company', 'user'].includes(stringKey)) {
      return encrypt(stringifyState, ENCRYPT_KEY);
    }

    return inboundState;
  },
  // Transform state before rehydrating from storage
  (outboundState, key) => {
    if (!outboundState) return outboundState;

    if (typeof outboundState === 'string') {
      // Decrypt specific parts of the state based on the key
      switch (key) {
        case 'session':
          return JSON.parse(decrypt(outboundState, ENCRYPT_KEY, '{"status":'));
        case 'model':
          return JSON.parse(decrypt(outboundState, ENCRYPT_KEY, '{"app":'));
        case 'company':
          return JSON.parse(decrypt(outboundState, ENCRYPT_KEY, '{"id":'));
        case 'user':
          return JSON.parse(decrypt(outboundState, ENCRYPT_KEY, '{"firstName":'));
        default:
          return outboundState;
      }
    }

    return outboundState;
  }
);

export default encrypted;
