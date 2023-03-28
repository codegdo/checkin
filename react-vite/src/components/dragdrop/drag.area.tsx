import React, { FC, PropsWithChildren } from 'react';

type DragAreaProps = PropsWithChildren<{}>;

export const DragArea: FC<DragAreaProps> = ({ children }): JSX.Element => {
  return (
    <div className='drag-area'>
      {children}
    </div>
  );
};
