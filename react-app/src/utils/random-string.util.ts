export const randomString = (prefix?: string): string => {
  //const character = 'abcdefghijklmnopqurstuvwxyz'.split('')[Math.floor(Math.random() * 27)];
  const n = Math.floor(Math.random() * 27);
  const character = 'abcdefghijklmnopqurstuvwxyz'.substring(n, n + 1);
  const random = Math.random().toString(16).slice(12);
  const str = prefix ? (prefix + '-' + character + random) : (character + '-' + random);
  return str;
};