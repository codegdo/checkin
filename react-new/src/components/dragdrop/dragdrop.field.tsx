import React, { useCallback, useEffect, useReducer, useState } from 'react';
import update from 'immutability-helper';

export type FieldState = {};

export type FieldAction = {
  type: 'INIT' | 'UPDATE_CONTENT';
  payload?: any;
};

const reducer = (state: FieldState, { type, payload }: FieldAction) => {
  switch (type) {
    case 'INIT':
      return { ...state, ...payload };
    case 'UPDATE_CONTENT':
      return update(state, {
        content: {
          values: {
            [payload.name]: { $set: payload.value }
          }
        }
      })
    default:
      return state;
  }
}

export const DragDropField: React.FC<any> = ({ id, role, label, description, position, list, item, setItem, updateItem, ...props }): JSX.Element => {

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

  const [state, dispatch] = useReducer(reducer, initialState);
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    dispatch({
      type: 'INIT',
      payload: initialState
    });
  }, []);

  useEffect(() => {

    if (isChange) {
      updateItem({ id, ...state.content.values });
    }

    return () => {
      setIsChange(false);
    }
  }, [isChange]);

  const onChange = ({ key, name, value }: any) => {

    switch (key) {
      case 'content':
        dispatch({
          type: 'UPDATE_CONTENT',
          payload: { name, value }
        });
        break;
    }

  };

  const onClick = (event) => {
    const name = event.target.name;

    switch (name) {
      case 'save':
        setIsChange(true);
        setItem(null);
        break;
      default:
        dispatch({
          type: 'INIT',
          payload: initialState
        });

        setItem(null);
    }
  };

  const target = (item?.id == id) ? null : {
    id,
    name: role,
    position,
    length: list.length,
    data: { ...state },
    onChange,
    onClick
  };

  useEffect(() => {

    if (!target && item) {
      console.log('TARGET && ITEM');
      if (item.position !== position) {
        setItem({ ...item, position, onChange, onClick });
      }
    }

  }, [target, list]);

  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    setItem(target);
  };

  return <div className={`dd-content`} onClick={handleClick}>
    <label>{state.content.values.label}</label>
    <input />
  </div>
};
