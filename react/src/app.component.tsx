import React from 'react';
import { HistoryRouter } from "redux-first-history/rr6";
import { AppRoute } from './app.route';
import { history } from './app.store';

export const App: React.FC = (): JSX.Element | null => {
  return <HistoryRouter history={history}>
    <AppRoute />
  </HistoryRouter>;
}