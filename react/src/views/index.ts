import { lazy } from 'react';

export * from './auth/auth.route';
export * from './home/home.route';
export * from './admin/admin.route';

export const notfound = lazy(() => import('./notfound.component'));
