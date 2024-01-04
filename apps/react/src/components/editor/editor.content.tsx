import { ActionType, ContextValue, IControl } from "./types";

interface IProps {
  data?: IControl[],
  context: ContextValue
}

function EditorContent({ data = [], context }: IProps) {
  if (!data) return null;

  const handleClick = (content: IControl[] | null) => {
    context.dispatch({
      type: ActionType.SET_CONTENT,
      payload: { content }
    })
  }

  return <ul>
    {
      data.map(item => {
        return <li key={item.name} onClick={() => handleClick(item.data)}>{item.title}</li>
      })
    }
  </ul>;
}

export default EditorContent;

