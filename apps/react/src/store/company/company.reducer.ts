import { PayloadAction, createReducer } from '@reduxjs/toolkit';

import {
  updateCompany,
} from './company.action';
import { CompanyData } from './company.type';

export const initialCompany: CompanyData = {};
type Action = PayloadAction<Partial<CompanyData>>;

export const companyReducer = createReducer(initialCompany, (builder) => {
  builder
    .addCase(updateCompany.type, (state, action: Action) => {
      return { ...state, ...action.payload };
    });
});
