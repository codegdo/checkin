export const randomString = (): string => {
  const character = 'abcdefghijklmnopqurstuvwxyz'.split('')[Math.floor(Math.random() * 27)];
  const random = Math.random().toString(16).slice(12);
  return character + '-' + random;
};


