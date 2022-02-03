export enum TokenEnum {
  VERIFY = 'verify',
}

export type TokenData<T> = {
  id: string;
  key: string;
  type: string;
  data: T;
  expiredAt: number;
}
