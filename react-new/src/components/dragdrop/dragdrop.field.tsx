import React, { useCallback, useEffect, useRef, useState } from 'react';

export const DragDropField: React.FC<any> = ({ id, role, label, description, item, setItem, ...props }): JSX.Element => {

  const [values, setValues] = useState({ label, description });

  const pageClickEvent = (e) => {
    setItem(null);
    console.log('CLICK');
  };

  useEffect(() => {
    if (item) {
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      window.removeEventListener('click', pageClickEvent);
    }
  }, [item]);

  const onChange = (newValues: { [key: string]: string }) => {
    setValues({ ...values, ...newValues })
  }

  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const target = item?.id == id ? null : {
      id,
      role,
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

    setItem(target);
  };

  return <div className={`dd-content`} onClick={handleClick}>
    <label>{values.label}</label>
    <input />
  </div>
};
