import { AppStatus } from '@/constants';

export interface SessionData {
  accountId: number | null;  // account_id
  clientId: number | null; // company_id
  status: AppStatus;     // status
  auth: boolean;       // auth

  // usr: string | null; // user
  // eml: string | null; // email
  // rol: string | null; // role
  // sid: string | null; // session ID
  // cty: string | null; // country
  // lng: string | null; // language
  // dev: string | null; // device
  // acc: boolean;       // account
  // sec: boolean;       // security
  // exp: boolean;       // expired
  // act: boolean;       // active
  // val: boolean;       // validated
  // tst: boolean;       // tested
}
