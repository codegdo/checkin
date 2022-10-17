import React, { useEffect, useReducer, useState } from 'react';

export type FieldState = {};

export type FieldAction = {
  type: 'INIT';
  payload?: any;
};



const reducer = (state: FieldState, { type, payload }: FieldAction) => {
  switch (type) {
    case 'INIT':
      return { ...state, ...payload };
    default:
      return state;
  }
}

export const DragDropField: React.FC<any> = ({ id, role, label, description, position, list, item, setItem, ...props }): JSX.Element => {

  const initialState = {
    content: {
      keys: {
        label: {
          type: 'text'
        },
        description: {
          type: 'textarea'
        }
      },
      values: {
        label,
        description
      }
    },
    style: {},
    setting: {}
  };

  const [{ content, style, setting }, dispatch] = useReducer(reducer, initialState);
  const [values, setValues] = useState({ label, description });

  useEffect(() => {
    dispatch({
      type: 'INIT',
      payload: initialState
    });
  }, [id]);

  useEffect(() => {
    setValues({ ...values, label, description });
  }, [id]);

  const onChange = (newValues: { [key: string]: string }) => {
    setValues({ ...values, ...newValues })
  }

  const onClick = () => { }

  const target = (item?.id == id) ? null : {
    id,
    name: role,
    position,
    length: list.length,
    data: { content, style, setting },

    values,
    fields: {
      label: {
        type: 'text'
      },
      description: {
        type: 'textarea'
      }
    },
    onChange,
    onClick
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
    <label>{content.values.label}</label>
    <input />
  </div>
};
