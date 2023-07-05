export function randomString(prefix = '', separator = '-'): string {
    const randomChar = 'abcdefghijklmnopqrstuvwxyz'.charAt(
      Math.floor(Math.random() * 26)
    );
    const randomStr = Math.random().toString(16).slice(4, 9);
    const str = prefix
      ? `${prefix}${separator}${randomStr}`
      : `${randomChar}${separator}${randomStr}`;
  
    return str;
  }