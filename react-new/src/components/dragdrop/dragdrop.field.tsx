import React, { useEffect, useState, MouseEvent } from 'react';

import { Label } from '../input/label.component';
import { Input } from '../input/input.component';

export const DragDropField: React.FC<any> = ({ id, type, name, className, role, label, description, position, isRequired, style, list, item, current, setItem, updateItem, ...props }): JSX.Element => {

  const initialValues = { className, label, description, style, isRequired };
  const [values, setValues] = useState(initialValues);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    setValues({ ...initialValues });
  }, [id]);

  useEffect(() => {

    if (isChange) {
      console.log('ISCHANGE', item);
      updateItem({ id, ...values });
      item && setItem(item);
    }

    return () => {
      setIsChange(false);
    }
  }, [isChange, values]);

  useEffect(() => {
    if (current?.item && current.item.id == id) {

      const isValueChanged = JSON.stringify(values) == JSON.stringify(current.item.values);

      if (!isValueChanged) {
        setIsChange(true);
      }

    }

  }, [current, item]);

  const onChange = (newValues: any) => {
    setValues({ ...values, ...newValues });
  };

  const onClick = (event: MouseEvent<HTMLElement, MouseEvent> & {
    target: { name: string | undefined }
  }) => {
    const { name } = event.target;

    switch (name) {
      case 'cancel':
        setValues(initialValues);
        setItem(null);
        break;
      default:
        setIsChange(true);
        setItem(null);
    }
  };

  useEffect(() => {

    if (item && item.id == id) {

      // duplicate and move item if not match with position
      // then reset setItem with item data
      if (item.position !== position) {
        setItem({
          id,
          type: role,
          position,
          list,
          values: { ...item.value },
          onChange,
          onClick
        });
      }
    }

    return () => {
      if (item && item.id == id) {
        // keep track with last selected item
        current.item = { ...item };
      }
    }

  }, [item]);

  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (item && item.id == id) {
      setItem(null);
    } else {
      setItem({
        id,
        type: role,
        position,
        list,
        values,
        onChange,
        onClick
      });
    }
  };

  return <div className={`dd-content x-${id}`} style={{ ...style?.field }} onClick={handleClick}>
    <Label className='label' label={values.label} description={values.description} />
    <Input id={id} name={name} type={type} />
  </div>
};
