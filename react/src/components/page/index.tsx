import React, { lazy } from 'react';
import { Template } from '../../components/template/template.component';

const NotFound = Template(lazy(() => import('./notfound.page')));
const UnAuthorize = Template(lazy(() => import('./unauthorize.page')));

export {
  NotFound,
  UnAuthorize
};