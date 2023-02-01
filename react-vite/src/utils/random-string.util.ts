export const randomString = (prefix?: string): string => {

  const n = Math.floor(Math.random() * 27);
  const char = 'abcdefghijklmnopqurstuvwxyz'.substring(n, n + 1);
  const random = Math.random().toString(16).slice(12);
  const str = prefix ? (prefix + '-' + char + random) : (char + '-' + random);

  return str;
};