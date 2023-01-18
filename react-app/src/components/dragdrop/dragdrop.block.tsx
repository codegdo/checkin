import React, { FC, useEffect, useMemo, useState, MouseEvent } from 'react';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import { Render } from './dragdrop.render';
import { useDragDrop } from '../../hooks';
import { DragDropToolbar } from './dragdrop.toolbar';

export const DragDropBlock: FC<any> = ({ children, ...props }): JSX.Element => {
  const { current, state: { item }, dispatch, onCallback, ...rest } = props;

  const { id, name, dataType, data, value } = rest;
  const initialValues = { ...rest };

  const [values, setValues] = useState(initialValues);
  const { ref, classNames, attributes, onMouseOver, onMouseOut } = useDragDrop(props);

  useEffect(() => {
    setValues(initialValues);
  }, []);

  const onChange = (event: MouseEvent<HTMLElement, MouseEvent>) => {
    //
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


  const events = (dataType == 'dropzone' || dataType == 'placeholder') ? null : {
    onMouseOver,
    onMouseOut,
    onClick: handleClick
  }

  const component = useMemo(() => {
    const strPurify = DOMPurify.sanitize(value, { ADD_TAGS: ['jsx'] });
    return parse(strPurify, {
      replace: (dom) => {

        if ('attribs' in dom) {
          const { attribs } = dom;
          if (attribs.id) {
            const [name, key] = attribs.id.split('_');
            const items = data.filter((item: any) => item.placeholderId == key);

            if (name == 'placeholder') {
              return <DragDropBlock
                {...props}
                id={`${id}_${key}`}
                name='block'
                dataType='placeholder'

                data={items}
                placeholderId={key}
              />
            }
          }
        }

        return dom;
      }
    });
  }, [data]);

  return <div
    ref={ref}
    id={id}
    className={`${classNames as string}`}
    {...attributes}
    {...events}
  >
    {
      (item?.id == id) && <DragDropToolbar {...props} />
    }
    {name == 'component' ? <>{component}</> : (children ? children : <Render data={data} />)}
  </div>
};


/* export const DragDropBlock: FC<any> = (props): JSX.Element => {

  const {
    id,
    className = '',
    role,
    name,
    position,
    data,
    current,
    item,
    setItem,
    children
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  const onChange = () => { }

  const onClick = (event: MouseEvent<HTMLElement, MouseEvent> & {
    target: { name: string | undefined }
  }) => {
    const { name } = event.target;

    switch (name) {
      case 'cancel':
        setItem(null);
        break;
      default:
        setItem(null);
    }
  };

  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    let boundingClientRect = null;

    if (ref && ref.current) {
      boundingClientRect = ref.current.getBoundingClientRect() as BoundingClientRect;
    }

    console.log(boundingClientRect);

    if (item?.id == id) {
      setItem(null);
    } else {
      setItem({
        id,
        type: role,
        position,
        //list,
        //values,
        isEdit: false,
        onChange,
        onClick
      });
    }
  }

  const events = (role == 'block') ? {
    onClick: handleClick
  } : {};

  return <div ref={ref} className={`block ${className}`} {...events}>
    {
      name == 'component' ?
        <>
          {
            parse(
              DOMPurify.sanitize(((typeof props.value === 'string') ? JSON.parse(props.value) : props.value).value, { ADD_TAGS: ['jsx'] }), {
              replace: (domNode): JSX.Element | null => {

                if ('attribs' in domNode) {
                  const { attribs } = domNode;

                  if (attribs.id) {
                    const [name, key] = attribs.id.split('_');
                    const items = props.data.filter((item: any) => item.placeholderId == key);

                    if (name == 'placeholder') {
                      return <DragDropBlock
                        id={`${id}_${key}`}
                        name='block'
                        type='div'
                        role='placeholder'

                        data={items}
                        context={props.context}
                        
                        position={position}
                        parentId={id}
                        placeholderId={key}
                      />
                    }
                  }
                  return null;
                }
                return null;
              }
            })
          }
        </> :
        <>{children ? children : <Render data={[...data]} />}</>
    }
  </div>
}; */
