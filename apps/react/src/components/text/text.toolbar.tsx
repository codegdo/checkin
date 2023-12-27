import { useSlate } from "slate-react";
import { ButtonMark } from "./button.mark";

export function TextToolbar() {
  const editor = useSlate();

  return <div>
    <ButtonMark editor={editor} format="bold" />
  </div>
}