import React, { useEffect, useState, MouseEvent } from 'react';

import { Label } from '../input/input.label';
import { Input } from '../input/input.component';
import { DragDropToolbar } from './dragdrop.toolbar';

export const DragDropField: React.FC<any> = (props): JSX.Element => {
  const { id, type, name, className, role, label, description, position, isRequired, style, list, item, current, setItem, updateItem } = props;
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
    console.log('FIELD ONCHANGE', newValues);
    setValues({ ...newValues });
    setIsChange(true);
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

  /*
    useEffect(() => {
  
       if (item && item.id == id) {
  
        // duplicate and move item if not match with position
        // then reset setItem with item data
        if (item.position !== position) {
          setItem({
            id,
            isEdit: item.isEdit,
            type: role,
            position,
            list,
            values: { ...item.values },
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
  */

  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (item?.id == id) {
      setItem(null);
    } else {
      setItem({
        id,
        type: role,
        position,
        list,
        values,
        isEdit: false,
        onChange,
        onClick
      });
    }
  };

  return <>
    {
      item?.id == id && <DragDropToolbar {...props} />
    }
    <div className={`field ${className}`} style={{ ...style?.field }} onClick={handleClick}>
      <Label className='label' label={values.label} description={values.description} style={{ ...style?.label }} />
      <Input id={id} name={name} type={type} />
    </div>
  </>
};
