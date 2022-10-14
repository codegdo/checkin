import React, { useEffect, useState } from 'react';

export const DragDropField: React.FC<any> = ({ id, role, label, description, position, list, item, setItem, ...props }): JSX.Element => {

  const [values, setValues] = useState({ label, description });

  useEffect(() => {
    setValues({ ...values, label, description });
  }, [id]);

  const onChange = (newValues: { [key: string]: string }) => {
    setValues({ ...values, ...newValues })
  }

  const target = (item?.id == id) ? null : {
    id,
    role,
    position,
    length: list.length,
    values,
    fields: {
      label: {
        type: 'text'
      },
      description: {
        type: 'textarea'
      }
    },
    onChange
  };

  useEffect(() => {

    if (!target && item) {
      if (item.position !== position) {
        setItem({ ...item, position, onChange });
      }
    }

  }, [target, list]);

  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('CLICK', target);
    setItem(target);
  };

  return <div className={`dd-content`} onClick={handleClick}>
    <label>{values.label}</label>
    <input />
  </div>
};
