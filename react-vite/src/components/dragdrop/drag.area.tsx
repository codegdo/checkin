import React, { PropsWithChildren } from 'react';

import { useWrapperContext } from "../../hooks";
import { DragDropContext } from "./dragdrop.context";

interface DragAreaProps extends PropsWithChildren { }

const DragArea: React.FC<DragAreaProps> = ({ children }): JSX.Element => {
  const context = useWrapperContext(DragDropContext);

  return (
    <div className='drag-area'>{children}</div>
  );
};

export default DragArea;