import React, { FC } from 'react';

import { useWrapperContext } from "../../hooks";
import { DataType } from "../form";

import { DragDropContext } from "./dragdrop.context";
import { DragDropRender } from "./dragdrop.render";
import { DropBlock } from "./drop.block";
import { dndHelper } from "./helpers/dragdrop.helper";

export const DropArea: FC = (): JSX.Element => {
  const { state, ...context } = useWrapperContext(DragDropContext);
  const data = dndHelper.nomalizeData(state?.data);

  console.log('state', state);
  console.log('nomalize', data);

  return (
    <DropBlock id='0' name='root' type='div' dataType={DataType.AREA} className="drop-area" {...context}>
      {<DragDropRender data={data} />}
    </DropBlock>
  );
}