export const maskedEmailAddress = (value: string): string => {
  return value.replace(/^(.{2})[^@]+/, '$1***')
}

export const maskedPhoneNumber = (value: string): string => {
  return value.replace(/^(.{3})+/, '******$1');
}