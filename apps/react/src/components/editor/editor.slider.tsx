import { forwardRef } from "react";
import EditorHeader from "./editor.header";
import EditorTab from "./editor.tab";
import EditorRender from "./editor.render";
import { useEditorContext } from "./editor.provider";
import { ActionType } from "./types";

interface IProps { }

export const EditorSlider = forwardRef<HTMLDivElement, IProps>((_, ref) => {
  const { state, dispatch } = useEditorContext();

  const handleClick = () => {
    dispatch({
      type: ActionType.CLEAR_CONTENT
    });
  }

  const contentDisplayStyle = {
    display: state.content ? 'none' : 'block'
  };

  const backDisplayStyle = {
    display: state.content ? 'block' : 'none'
  };

  return <div className="animation-slide">
    <div ref={ref} className="drag-handle">drag-handle</div>
    <div style={contentDisplayStyle}>
      <EditorHeader />
      <EditorTab />
      <EditorRender />
    </div>
    <div style={backDisplayStyle}>
      <EditorHeader />
      
      content
    </div>
  </div>
});

