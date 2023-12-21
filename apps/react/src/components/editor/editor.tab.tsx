import { useWrapperContext } from "@/hooks";
import EditorContext from "./editor.provider";
import { editorHelper } from "./helpers";

function EditorTab() {
  const context = useWrapperContext(EditorContext);
  const tabs = editorHelper.getEditor();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    console.log(context);
  }

  return <div>
    {
      tabs.map(tab => {
        return <button key={tab.id} type="button" onClick={handleClick}>{tab.title}</button>
      })
    }
  </div>
}

export default EditorTab;

