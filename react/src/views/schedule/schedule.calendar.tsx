import React, { lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import { Partial } from '../../components/template/partial.component';

const Appointment = Partial(lazy(() => import('./appointment/appointment.page')));
const NotFound = Partial(lazy(() => import('../notfound.component')));

const ScheduleCalendar: React.FC = (): JSX.Element => {

  return <Routes>
    <Route path="/" element={<Navigate to="appointments" />} />
    <Route path="appointments" element={<Appointment page="appointments" />} />
    <Route path="*" element={<NotFound page="not-found" />} />
  </Routes>;
};

export default ScheduleCalendar;