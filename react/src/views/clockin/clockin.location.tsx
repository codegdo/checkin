import React, { lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import { Partial } from '../../components/template/partial.component';

const Employee = Partial(lazy(() => import('./employee/employee.page')));
const NotFound = Partial(lazy(() => import('../notfound.component')));

const ClockinLocation: React.FC = (): JSX.Element => {

  return <Routes>
    <Route path="/" element={<Navigate to="employees" />} />
    <Route path="employees" element={<Employee page="employees" />} />
    <Route path="*" element={<NotFound page="not-found" />} />
  </Routes>;
};

export default ClockinLocation;