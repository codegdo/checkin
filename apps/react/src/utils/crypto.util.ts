export function encrypt(plaintext: string, key: string): string {
  let encrypted = '';
  for (let i = 0; i < plaintext.length; i++) {
    let charCode = plaintext.charCodeAt(i);
    charCode ^= key.charCodeAt(i % key.length);
    encrypted += String.fromCharCode(charCode);
  }
  return btoa(encrypted); // Encode in Base64
}

export function decrypt(ciphertext: string, key: string, match: string): string {
  let decrypted = '';
  try {
    ciphertext = atob(ciphertext); // Decode from Base64
  } catch (error) {
    throw new Error('Invalid Base64 ciphertext');
  }
  for (let i = 0; i < ciphertext.length; i++) {
    let charCode = ciphertext.charCodeAt(i);
    charCode ^= key.charCodeAt(i % key.length);
    decrypted += String.fromCharCode(charCode);
  }
  // Check if the decrypted text has a specific prefix to verify the key
  if (!decrypted.startsWith(match)) {
    throw new Error('Incorrect key or invalid ciphertext');
  }
  return decrypted;
}

/*
// Usage
const secretKey = 'YourSecretKey';
const originalText = '{username: "gdo"}';
const encryptedText = encrypt(originalText, secretKey);
const decryptedText = decrypt(encryptedText, 'IncorrectKeyForDemonstration', '{username');

console.log('Original Text:', originalText);
console.log('Encrypted Text:', encryptedText);
console.log('Decrypted Text:', decryptedText);


const options = { algorithm: 'AES-GCM' };

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

export async function encrypt(data: unknown, keyObj: { key: ArrayBuffer; iv: Uint8Array }, secretKey: string): Promise<string> {
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
    const err = error as Error;
    console.error('Encryption Error:', err.message);
    throw err; // Rethrow the error to handle it elsewhere
  }
}

export async function decrypt(encrypted: string, keyObj: { key: ArrayBuffer; iv: Uint8Array }, secretKey: string) {
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
    const err = error as Error;
    console.error('Encryption Error:', err.message);
    throw err; // Rethrow the error to handle it elsewhere
  }
}
*/