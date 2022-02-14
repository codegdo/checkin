import React, { lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import { Partial } from '../../components/template/partial.component';

const Client = Partial(lazy(() => import('./client/client.page')));
const NotFound = Partial(lazy(() => import('../../components/page/notfound.page')));

const CheckinLocation: React.FC = (): JSX.Element => {

  return <Routes>
    <Route path="/" element={<Navigate to="clients" />} />
    <Route path="clients" element={<Client page="clients" />} />
    <Route path="*" element={<NotFound page="not-found" />} />
  </Routes>;
};

export default CheckinLocation;