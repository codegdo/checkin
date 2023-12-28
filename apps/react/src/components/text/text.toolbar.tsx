import { useSlate } from "slate-react";
import { TextButton } from "./text.button";

export function TextToolbar() {
  const editor = useSlate();

  return <div>
    <TextButton name="mark" editor={editor} format="bold" />
  </div>
}