import React, { PropsWithChildren } from 'react';

import { useWrapperContext } from "../../hooks";
import { DragDropContext } from "./dragdrop.context";

const DragArea: React.FC<PropsWithChildren<{}>> = ({ children }): JSX.Element => {
  const context = useWrapperContext(DragDropContext);

  return (
    <div>{children}</div>
  );
};

export default DragArea;