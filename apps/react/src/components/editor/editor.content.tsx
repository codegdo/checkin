import { Control } from "../control";
import { ActionType, ContextValue, IControl } from "./types";

interface IProps {
  data?: IControl[],
  context: ContextValue
}

function EditorContent({ data = [], context }: IProps) {

  return (
    <>
      {
        data.map(item => {
          return <Control key={item.name} {...item} />
        })
      }
  </>
  )
}

export default EditorContent;

