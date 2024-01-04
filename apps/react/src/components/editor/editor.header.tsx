import { useEditorContext } from "./editor.provider";

function EditorHeader() {
  const { current, state } = useEditorContext();

  return <div className="editor-header">
    <button type="button" onClick={handleClick}>Back</button>
    <div>{state.content ? state.content.title : current.data?.dataType}</div>
  </div>
};

export default EditorHeader;