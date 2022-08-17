import React, { Children, isValidElement, PropsWithChildren, useMemo } from 'react';
import { ColumnProps } from '../table/table.type';
import { Footer } from './gridview.footer';
import { Header } from './gridview.header';
import { Main } from './gridview.main';
import { RenderProps } from './gridview.type';

export const Render = <T extends Object>({ children }: PropsWithChildren<RenderProps<T>>): JSX.Element => {

  const columns = useMemo(() => {
    const cols: ColumnProps[] = [];

    children && Children.toArray(children).map((child) => {
      if (isValidElement(child) && typeof child.type !== 'string' && child.type.name == 'Column') {
        const { props } = child;

        if (props.children) {

        }

        cols.push({ ...props });
      }
    });

    return cols;
  }, []);

  return <>
    <Header columns={columns} />
    <Main<T> columns={columns} />
    <Footer />
  </>
}