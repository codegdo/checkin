import EditorNav from "./editor.nav";
import { ContextValue } from "./types";

interface IProps {
  context: ContextValue
}

function EditorRender({ context }: IProps) {

  const tab = context.state?.tab || {};

  switch (tab.name) {
    case 'content':
      return <EditorNav data={tab.data} context={context} />
    default:
      return null;
  }

}

export default EditorRender;