import React, { memo, PropsWithChildren } from 'react';

import { formHelper } from '../../helpers';
import { useWrapperContext } from '../../hooks';
import { DragDropBlock } from './dragdrop.block';
import { DragDropContext } from './dragdrop.context';
import { DragDropElement } from './dragdrop.element';
import { DragDropField } from './dragdrop.field';

interface RenderProps {
  data?: any[]
}

export const DragDropRender: React.FC = (): JSX.Element => {
  const context = useWrapperContext(DragDropContext);
  const data = formHelper.mapField(context?.state?.data);

  console.log(data);

  return <DragDropBlock
    id="dropzone"
    className="form"
    name="block"
    dataType="dropzone"
    {...context}
  >
    <Render data={data} />
  </DragDropBlock>

}

export const Render: React.FC<PropsWithChildren<RenderProps>> = memo(({ data = [] }): JSX.Element => {

  const context = useWrapperContext(DragDropContext);

  return <>
    {
      data.map((item) => {
        switch (item.dataType) {
          case 'block':
          case 'dropzone':
          case 'placeholder':
            return <DragDropBlock key={item.id} {...item} {...context} />
          case 'element':
            return <DragDropElement key={item.id} {...item} {...context} />
          case 'field':
            return <DragDropField key={item.id} {...item} {...context} />
          default: return null;
        }
      })
    }
  </>
})