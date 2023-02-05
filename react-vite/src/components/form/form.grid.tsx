import React, { Children, isValidElement, PropsWithChildren, useMemo } from 'react';
//import { Table } from '../table/table.component';

interface GridProps {
  data?: any
}

export const Grid: React.FC<PropsWithChildren<GridProps>> = ({ children }): JSX.Element => {

  const columns = useMemo(() => {
    const cols: any[] = [];

    children && Children.toArray(children).map((child) => {
      if (isValidElement(child) && typeof child.type !== 'string' && child.type.name == 'Field') {
        const { props } = child;

        if (props.children) {

        }

        cols.push({ ...props });
      }
    });

    return cols;
  }, []);

  //return <Table columns={[...columns]} />
  return <></>
}