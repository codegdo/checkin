import React, { PropsWithChildren } from 'react';

interface DragAreaProps extends PropsWithChildren { }

function DragArea({ children }: DragAreaProps): JSX.Element {
  return (
    <div className='drag-area'>
      {children}
    </div>
  );
};

export default DragArea;