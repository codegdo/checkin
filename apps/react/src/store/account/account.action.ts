import { createAction } from '@reduxjs/toolkit';
import { AccountData } from './account.type';

export const updateAccount = createAction<Partial<AccountData>>('account/UPDATE');
