import Aes from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const secretKey = 'your-super-secret-key';

export function encryptData<T>(data: T) {
  return Aes.encrypt(JSON.stringify(data), secretKey).toString();
}

export function decryptData(encryptedData: string) {
  const decrypted = Aes.decrypt(encryptedData, secretKey).toString(Utf8);
  return JSON.parse(decrypted);
}


/*const options = { algorithm: 'AES-GCM' };

export async function generateKey(): Promise<{ key: ArrayBuffer; iv: Uint8Array }> {
  const key = await window.crypto.subtle.generateKey(
    { name: options.algorithm, length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  // Export the key as an ArrayBuffer
  const exportedKey = await window.crypto.subtle.exportKey('raw', key);

  return { key: exportedKey, iv: window.crypto.getRandomValues(new Uint8Array(12)) }; // Generate an initialization vector
}

export async function deriveKeyFromSecret(secretKey: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();

  // Import the secret key
  const importedSecretKey = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(secretKey),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  // Derive bits using PBKDF2
  const derivedBits = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    importedSecretKey,
    256
  );

  // Convert the derived bits to a key
  return window.crypto.subtle.importKey(
    'raw',
    derivedBits,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encrypt(data: any, keyObj: { key: ArrayBuffer; iv: Uint8Array }, secretKey: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(JSON.stringify(data));

    // Derive a key from the provided secret key
    const encryptionKey = await deriveKeyFromSecret(secretKey, keyObj.iv);

    const encryptedBuffer = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: keyObj.iv },
      encryptionKey,
      dataBuffer
    );

    const encryptedArray = Array.from(new Uint8Array(encryptedBuffer));

    // Convert the binary data to Base64
    const base64String = btoa(String.fromCharCode(...encryptedArray));
    return base64String;
  } catch (error) {
    console.error('Encryption Error:', error.message);
    throw error; // Rethrow the error to handle it elsewhere
  }
}

export async function decrypt(encrypted: string, keyObj: { key: ArrayBuffer; iv: Uint8Array }, secretKey: string): Promise<any> {
  try {
    const decoder = new TextDecoder();
    const encryptedArray = new Uint8Array(Array.from(atob(encrypted), c => c.charCodeAt(0)));

    // Derive a key from the provided secret key
    const decryptionKey = await deriveKeyFromSecret(secretKey, keyObj.iv);

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: keyObj.iv },
      decryptionKey,
      encryptedArray
    );

    return JSON.parse(decoder.decode(decryptedBuffer));
  } catch (error) {
    console.error('Decryption Error:', error.message);
    throw error; // Rethrow the error to handle it elsewhere
  }
}
*/