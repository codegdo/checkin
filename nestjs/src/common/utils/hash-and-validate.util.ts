import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

export const hashPassword = async (password: string) => {
  const salt = randomBytes(8).toString('hex');
  const hash = (await scrypt(password, salt, 32)) as Buffer;
  return hash.toString('hex') + '.' + salt;
}

export const validatePassword = async (password: string, _password: string) => {
  const [hashPassword, salt] = _password.split('.');
  const hash = (await scrypt(password, salt, 32)) as Buffer;
  return hashPassword === hash.toString('hex');
}