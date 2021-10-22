import { lazy } from 'react';

export * from './auth/auth.route';
export * from './checkin/checkin.route';
export * from './clockin/clockin.route';
export * from './home/home.route';
export * from './setup/setup.route';
export * from './scheduler/scheduler.route';

export const notfound = lazy(() => import('./notfound.component'));
