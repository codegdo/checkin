import { useSlate } from "slate-react";
import { ToolbarButton } from "./toolbar.button";
import { MarkButton } from "./types";

interface IProps {
  markButtons?: MarkButton[]
}

export function TextToolbar({ markButtons = [] }: IProps) {
  const editor = useSlate();

  return <div>
    {
      markButtons.map(({ name, format, icon }) => {
        return <ToolbarButton key={format} name={name} editor={editor} format={format} icon={icon} />
      })
    }
  </div>
}