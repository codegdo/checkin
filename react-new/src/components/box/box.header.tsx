import React, { PropsWithChildren } from 'react';

type BoxHeaderProps = React.HTMLProps<HTMLElement>

export const BoxHeader = React.forwardRef<HTMLElement, BoxHeaderProps>((props: any, ref): JSX.Element => {
  return <header ref={ref}>{props.children}</header>
});