import React from 'react';
//import { Navigate, Route, Routes } from 'react-router-dom';

//import { Partial } from '../../components/template/partial.component';

//const User = Partial(lazy(() => import('./user/user.page')));
//const NotFound = Partial(lazy(() => import('../notfound.component')));

const Config: React.FC = (props): JSX.Element => {
  console.log('CONFIG', props);
  return <div>CONFIG</div>
  /* return <Routes>
    <Route path="/" element={<Navigate to="users" />} />
    <Route path="users" element={<User page="user" />} />
    <Route path="*" element={<NotFound page="not-found" />} />
  </Routes>; */
};

export default Config;