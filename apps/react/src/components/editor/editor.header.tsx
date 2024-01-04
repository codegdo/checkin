import { ActionType, ContextValue } from "./types";

interface IProps {
  context: ContextValue
}

function EditorHeader({ context }: IProps) {

  const { current, state, dispatch } = context;

  const handleClick = () => {
    dispatch({
      type: ActionType.CLEAR_CONTENT
    });
  }

  return (
    <div className="editor-header">
      {
        state.content ?
          <div>
            <button type="button" onClick={handleClick}>Back</button>
            {state.content.title}
          </div> :
          <div>{current.data?.dataType}</div>
      }
    </div>
  )
}

export default EditorHeader;