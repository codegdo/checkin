import React, { FC } from 'react';
import { ControlBlock } from './control.block';
import { ControlPadding } from './control.padding';
import { ControlRange } from './control.range';
import { ControlText } from './control.text';

export const ControlRender: FC<any> = ({ data = [] }): JSX.Element => {

  return <>
    {
      data.map((item, index) => {
        const { dataType, type } = item;

        if (dataType === 'block') {
          return <ControlBlock key={index} {...item} />;
        }

        switch (type) {
          case 'padding': return <ControlPadding key={index} {...item} />;
          case 'range': return <ControlRange key={index} {...item} />;
          case 'text': return <ControlText key={index} {...item} />;
          default: return null;
        }
      })
    }
  </>
}