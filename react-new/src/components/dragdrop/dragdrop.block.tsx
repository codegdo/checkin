import React, { FC, useEffect, useMemo, useState, MouseEvent } from 'react';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import { Render } from './dragdrop.render';
import { useDragDrop } from '../../hooks';
import { DragDropToolbar } from './dragdrop.toolbar';

export const DragDropBlock: FC<any> = ({ children, ...props }): JSX.Element => {
  const { id, type, name, className, style, context } = props;
  const { item, setItem } = context;
  const initialValues = { style };

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
        setItem(null);
    }
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const currentItem = (item?.id == id) ? null : { id, onChange, onClick };
    setItem(currentItem);
  }


  const events = (props.role == 'dropzone' || props.role == 'placeholder') ? null : {
    onMouseOver,
    onMouseOut,
    onClick: handleClick
  }

  const component = useMemo(() => {
    const value = DOMPurify.sanitize(props.value, { ADD_TAGS: ['jsx'] });
    return parse(value, {
      replace: (dom) => {

        if ('attribs' in dom) {
          const { attribs } = dom;
          if (attribs.id) {
            const [name, key] = attribs.id.split('_');
            const items = props.data.filter((item: any) => item.placeholderId == key);

            if (name == 'placeholder') {
              return <DragDropBlock
                {...props}
                id={`${props.id}_${key}`}
                name='block'
                role='placeholder'

                data={items}
                placeholderId={key}
              />
            }
          }
        }

        return dom;
      }
    })
  }, [props.data]);

  return <div
    ref={ref}
    id={props.id}
    className={`${classNames}`}
    {...attributes}
    {...events}
  >
    {
      (item?.id == id) && <DragDropToolbar {...props} />
    }
    {props.name == 'component' ? <>{component}</> : (children ? children : <Render data={props.data} />)}
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
