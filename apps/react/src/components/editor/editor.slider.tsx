import { forwardRef } from "react";
import EditorTab from "./editor.tab";
import EditorRender from "./editor.render";
import { useEditorContext } from "./editor.provider";
import utils from "@/utils";
import { ActionType } from "./types";

interface IProps { }

export const EditorSlider = forwardRef<HTMLDivElement, IProps>((_, ref) => {
  const context = useEditorContext();

  const className = utils.classNames('editor', context.state.key);

  const isContentActive = !context.state.content;

  const handleClick = () => {
    context.dispatch({
      type: ActionType.CLEAR_CONTENT
    });
  }

  return (
    <div className={className}>
      <div className={isContentActive ? 'ease-in' : 'ease-out'}>
        <div ref={ref} className="editor-header">
          {context.current.data?.dataType}
        </div>
        <EditorTab context={context} />
        <EditorRender context={context} />
      </div>
      {!isContentActive && (
        <div className="ease-in">
          <div className="editor-header">
            <button type="button" onClick={handleClick}>Back</button>
            {context.state.content?.title}
          </div>
        </div>
      )}
    </div>
  );
});
