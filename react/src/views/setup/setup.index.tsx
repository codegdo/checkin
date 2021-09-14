import React, { lazy } from 'react';
//import { Navigate, Route, Routes } from 'react-router-dom';

//import { Partial } from '../../components/template/partial.component';

//const User = Partial(lazy(() => import('./user/user.page')));
//const NotFound = Partial(lazy(() => import('../notfound.component')));

const Setup: React.FC = (): JSX.Element => {
  return <div>SETUP</div>
  /* return <Routes>
    <Route path="/" element={<Navigate to="users" />} />
    <Route path="users" element={<User page="user" />} />
    <Route path="*" element={<NotFound page="not-found" />} />
  </Routes>; */
};

export default Setup;