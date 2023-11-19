import { createAction } from '@reduxjs/toolkit';
import { CompanyData } from './company.type';

export const updateCompany= createAction<Partial<CompanyData>>('company/UPDATE');
