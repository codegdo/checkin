import React from 'react';

import { ControlFilter } from './control.filter';
import { ControlSearch } from './control.search';

export const StaticControl: React.FC = ({ children }): JSX.Element => {

  return <>
    <ControlSearch>{children}</ControlSearch>
    <ControlFilter>{children}</ControlFilter>
  </>
}