import React, { useEffect, useReducer, useState, MouseEvent } from 'react';
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

export const DragDropField: React.FC<any> = ({ id, role, label, description, position, list, item, current, setItem, updateItem, ...props }): JSX.Element => {

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
  }, [id]);

  useEffect(() => {

    if (isChange) {
      console.log('ISCHANGE', item);
      updateItem({ id, ...state.content.values });
      setItem(item);
    }

    return () => {
      setIsChange(false);
    }
  }, [isChange, state]);

  useEffect(() => {
    if (current?.item && current.item.id == id) {

      const isValueChanged = JSON.stringify(state) == JSON.stringify(current.item.data);

      if (!isValueChanged) {
        setIsChange(true);
      }

    }

  }, [current, item]);

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

  const onClick = (event: MouseEvent<HTMLElement>) => {
    const name = event.target.name;

    switch (name) {
      case 'cancel':
        dispatch({
          type: 'INIT',
          payload: initialState
        });
        setItem(null);
        break;
      default:
        setIsChange(true);
        setItem(null);
    }
  };

  let target = (item?.id == id) ? null : {
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

      // duplicate and move item if not match with position
      // then reset setItem with item data
      if (item.position !== position) {
        setItem({
          id,
          name: role,
          position,
          length: list.length,
          data: { ...item.data },
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

  }, [target, item]);

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
