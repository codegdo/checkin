import React, { useEffect, useState, MouseEvent } from 'react';

import { useDragDrop } from '../../hooks';
import { Input, Label } from '../input';
import { DragDropToolbar } from './dragdrop.toolbar';

export const DragDropField: React.FC<any> = (props): JSX.Element => {
  const { current, state: { item }, dispatch, onCallback, ...rest } = props;

  const { id, type, name, styles } = rest;
  const initialValues = { ...rest };

  const [values, setValues] = useState(initialValues);
  const { ref, stringClass, attributes, onMouseOver, onMouseOut } = useDragDrop(props);

  useEffect(() => {
    setValues(initialValues);
  }, []);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_ITEM',
      payload: values
    });
  }, [values]);

  const onChange = (newValue: any) => {
    //
    console.log('NEW VALUE', newValue);
    setValues({ ...values, ...newValue });
  }

  const onClick = (event: MouseEvent<HTMLElement, MouseEvent> & { target: { name: string | undefined } }) => {
    const { name } = event.target;

    switch (name) {
      default:
        dispatch({
          type: 'SET_ITEM_EDIT',
          payload: null
        });
    }
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const currentItem = (item?.id == id) ? null : { id, values, onChange, onClick };

    dispatch({
      type: 'SET_ITEM_EDIT',
      payload: currentItem
    });
  }

  return <div
    ref={ref}
    id={id}
    className={`${stringClass}`}
    style={styles?.field}
    {...attributes}
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
    onClick={handleClick}
  >
    {
      (item?.id == id) && <DragDropToolbar {...props} />
    }
    <Label label={values.label} description={values.description} styles={styles} />
    <Input id={id} name={name} type={type} />
  </div>
};

/*
export const DragDropField: React.FC<any> = (props): JSX.Element => {
  const { id, type, name, className, role, label, description, position, isRequired, style, list, item, current, setItem, updateItem } = props;
  const initialValues = { className, label, description, style, isRequired };
  
  const [values, setValues] = useState(initialValues);
  const [isChange, setIsChange] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        //
        break;
      default:
        setValues(initialValues);
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

/*  const handleClick = (event: any) => {
   event.preventDefault();
   event.stopPropagation();
 
   // let boundingClientRect = null;
 
   // if (ref && ref.current) {
   //   boundingClientRect = ref.current.getBoundingClientRect() as BoundingClientRect;
   // }
 
   // console.log(boundingClientRect);
 
   let currentItem = null;
 
   if (item?.id !== id) {
     currentItem = {
       id,
       type: role,
       position,
       //list,
       //values,
       isEdit: false,
       onChange,
       onClick
     };
   }
 
   setItem(currentItem);
 }; */

/*    return <div ref={ref} className={`field ${className}`} style={{ ...style?.field }}>
     <Label className='label' label={values.label} description={values.description} style={{ ...style?.label }} />
     <Input id={id} name={name} type={type} />
   </div>
 }; */

