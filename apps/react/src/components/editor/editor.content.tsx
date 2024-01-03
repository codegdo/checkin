import { useEditorContext } from "./editor.provider";
import { ContextValue, IControl } from "./types";
import EditorText from "./editor.text";

interface IProps {
  data: IControl[],
  context: ContextValue
}

const render = ({ data = [], context }: IProps) => {
  return <>
    {
      data.map(item => {
        return <EditorText key={item.name} {...item} context={context} />
      })
    }
  </>
}

function EditorContent() {
  const context = useEditorContext();
  const { data } = context.state?.tab || {};

  if (!data) return null;

  return <div>
    {render({ data, context })}
  </div>;
}

export default EditorContent;

