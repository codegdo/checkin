import { MouseEvent } from "react";
import { useSlate } from "slate-react";

export function TextToolbar() {
  const editor = useSlate();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    console.log(editor);
  }

  return <div>
    <button type="button" onClick={handleClick}>bold</button>
  </div>
}