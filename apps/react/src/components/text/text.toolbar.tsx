import { useSlate } from "slate-react";
import { ToolbarButton } from "./toolbar.button";
import { IToolbarButton } from "./types";

interface IProps {
  buttons?: IToolbarButton[]
}

export function TextToolbar({ buttons = [] }: IProps) {
  const editor = useSlate();

  return <div>
    {
      buttons.map(({ name, format, icon }) => {
        return <ToolbarButton key={name} name={name} editor={editor} format={format} icon={icon} />
      })
    }
  </div>
}