import React, { PropsWithChildren } from 'react';

type PanelHeaderProps = React.HTMLProps<HTMLElement>

export const PanelHeader = React.forwardRef<HTMLElement, PanelHeaderProps>((props: any, ref): JSX.Element => {
  return <header ref={ref}>{props.children}</header>
});