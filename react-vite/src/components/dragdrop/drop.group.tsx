import React from 'react';

import { DndItem } from './dragdrop.type';

interface DropGroupProps {
  dataType: string,
  data?: DndItem[];
}

const DropGroup: React.FC<DropGroupProps> = (): JSX.Element => {

  return (
    <></>
  );
};

export default DropGroup;