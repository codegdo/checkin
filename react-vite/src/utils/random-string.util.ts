export const randomString = (prefix?: string): string => {
  const n = Math.floor(Math.random() * 26);
  const char = 'abcdefghijklmnopqrstuvwxyz'.charAt(n);
  const random = Math.random().toString(16).slice(4, 8); // use slice(4, 8) to get a 5-character random string
  const str = prefix ? `${prefix}-${char}${random}` : `${char}-${random}`;

  return str;
};
