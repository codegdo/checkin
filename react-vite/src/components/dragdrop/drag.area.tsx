import React, { PropsWithChildren } from 'react';

interface DragAreaProps extends PropsWithChildren { };

export function DragArea({ children }: DragAreaProps) {
  return (
    <div className='drag-area'>
      {children}
    </div>
  );
};
