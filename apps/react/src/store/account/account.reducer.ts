import { PayloadAction, createReducer } from '@reduxjs/toolkit';

import {
  updateAccount,
} from './account.action';
import { AccountData } from './account.type';

export const initialAccount: AccountData = {};
type Action = PayloadAction<Partial<AccountData>>;

export const accountReducer = createReducer(initialAccount, (builder) => {
  builder
    .addCase(updateAccount.type, (state, action: Action) => {
      return { ...state, ...action.payload };
    });
});
