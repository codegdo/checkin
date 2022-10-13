import React, { useCallback, useEffect, useState } from 'react';

export const DragDropField: React.FC<any> = ({ id, role, label, item, setItem, ...props }): JSX.Element => {
  const [field, setField] = useState({ label });

  useEffect(() => {
    //setField({ ...field, label });
  }, [id]);

  const onChange = (value) => {
    //setField({ ...field, label: value })
  }

  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const target = item?.id == id ? null : {
      id,
      role,
      field,
      onChange
    };

    setItem(target);
  };

  return <div className={`dd-content`} onClick={handleClick}>{label}</div>
};
