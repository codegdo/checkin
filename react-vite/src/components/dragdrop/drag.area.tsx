import React, { PropsWithChildren } from 'react';


interface DragAreaProps extends PropsWithChildren { }

const DragArea: React.FC<DragAreaProps> = ({ children }): JSX.Element => {


  return (
    <div className='drag-area'>
      {children}
    </div>
  );
};

export default DragArea;