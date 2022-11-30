import React from 'react';

type BoxHeaderProps = React.HTMLProps<HTMLElement>

export const BoxHeader = React.forwardRef<HTMLElement, BoxHeaderProps>(({ className = '', children }, ref): JSX.Element => {
  return <header ref={ref} className={className}>{children}</header>
});