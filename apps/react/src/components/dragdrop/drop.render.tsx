import { useMemo } from "react";

import { groupDataForRender } from "@/utils";
import { ContextValue, Field } from "./types";
import { useDragDropContext } from "./dragdrop.provider";
import DropArea from "./drop.area";
import DropSection from "./drop.section";
import DropBlock from "./drop.block";
import DropField from "./drop.field";
import DropElement from "./drop.element";

interface IProps {
  data?: Field[] | null;
  context: ContextValue;
}

const render = ({ data = [], context }: IProps) => {

  return (
    <>
      {
        data?.map(item => {
          const { id, dataType, data: childData = [] } = item;

          switch (dataType) {
            case 'area':
              return <DropArea key={id} {...item} context={context}>
                {render({ data: childData, context })}
              </DropArea>;
            case 'section':
              return <DropSection key={id} {...item} context={context}>
                {render({ data: childData, context })}
              </DropSection>;
            case 'block':
              return <DropBlock key={id} {...item} context={context}>
                {render({ data: childData, context })}
              </DropBlock>;
            case 'field':
              return <DropField key={id} {...item} context={context} />;
            case 'element':
              return <DropElement key={id} {...item} context={context} />;
            default:
              return null;
          }
        })
      }
    </>
  );
}

function DropRender() {
  const context = useDragDropContext();
  const data = context.state.data as Field[];
  const renderData = useMemo(() => {
    return [{
      id: 'root-area',
      name: 'area',
      type: 'div',
      dataType: 'area',
      parentId: null,
      data: groupDataForRender(data)
    }]
  }, [data]);



  console.log('renderData', renderData, context);

  return <>{render({ data: renderData, context })}</>
}

export default DropRender;