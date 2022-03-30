export enum MaskEnum {
  PHONE = 'phone',
  EMAIL = 'email'
}

export const maskValue = (key: MaskEnum, value: string): string => {

  if (typeof value != 'string') {
    console.warn('Expect mask value is string!');
    return value;
  }

  switch (key) {
    case 'email':
      return value.replace(/^(.{2})[^@]+/, '$1***');
    case 'phone':
      return value.replace(/^(.{3})+/, '******$1');
    default:
      return value;
  }

}