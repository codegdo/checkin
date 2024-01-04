import EditorContent from "./editor.content";
import { useEditorContext } from "./editor.provider";

function EditorRender() {
  const context = useEditorContext();
  const tab = context.state?.tab || {};

  switch (tab.name) {
    case 'content':
      return <EditorContent data={tab.data} context={context} />
    default:
      return null;
  }

}

export default EditorRender;