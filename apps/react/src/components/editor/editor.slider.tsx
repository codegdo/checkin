import { forwardRef } from "react";
import EditorHeader from "./editor.header";
import EditorTab from "./editor.tab";
import EditorRender from "./editor.render";
import { useEditorContext } from "./editor.provider";
import { classNames } from "@/utils";

interface IProps { }

export const EditorSlider = forwardRef<HTMLDivElement, IProps>((_, ref) => {
  const context = useEditorContext();

  const className = classNames('editor-slide', context.state.step);

  const isContentActive = !context.state.content;

  return (
    <div className={className}>
      <div ref={ref} className="drag-handle">drag-handle</div>
      <div className={isContentActive ? 'is-active' : 'is-inactive'}>
        <EditorHeader context={context} />
        <EditorTab context={context} />
        <EditorRender context={context} />
      </div>
      {/* <div className={isContentActive ? 'is-inactive' : 'is-active'}>
        <EditorHeader context={context} />
        herel tehre
        asdflasdjf
      </div> */}
      {!isContentActive && (
        <div className="is-active">
          <EditorHeader context={context} />
        </div>
      )}
    </div>
  );
});
