export const randomString = (prefix?: string, separator: string = '-'): string => {
  const randomChar = 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 26));
  const randomString = Math.random().toString(16).slice(4, 9);
  const str = prefix ? `${prefix}${separator}${randomString}` : `${randomChar}${separator}${randomString}`;

  return str;
};
