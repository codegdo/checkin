import React from 'react';

import { ControlSearch } from './control.search';
import { ControlFilter } from './control.filter';

export const DynamicControl: React.FC<any> = ({ data }): JSX.Element => {

  return <>
    <ControlSearch data={data} />
    <ControlFilter data={data} />
  </>
}