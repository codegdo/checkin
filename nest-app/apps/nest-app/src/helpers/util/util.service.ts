import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {

  maskText({ key, value }: MaskText) {
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
}

export enum MaskTextEnum {
  PHONE = 'phone',
  EMAIL = 'email'
}

export interface MaskText {
  key: MaskTextEnum,
  value: string
}

