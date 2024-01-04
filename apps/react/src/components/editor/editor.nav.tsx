import { ActionType, ContextValue, IControl } from "./types";

interface IProps {
  data?: IControl[],
  context: ContextValue
}

function EditorNav({ data = [], context }: IProps) {
  if (!data) return null;

  const handleClick = (content: IControl | null) => {
    context.dispatch({
      type: ActionType.SET_CONTENT,
      payload: { content }
    })
  }

  return <nav>
    {
      data.map(item => {
        return <button key={item.name} type="button" onClick={() => handleClick(item)}>{item.title}</button>
      })
    }
  </nav>;
}

export default EditorNav;

