import { useSlate } from "slate-react";

import { IBlockButton, IMarkButton } from "./types";
import { BlockButton } from "./block.button";
import { MarkButton } from "./mark.button";

interface IProps {
  mark?: IMarkButton[],
  formating?: IBlockButton[],
  list?: IBlockButton[]
}

export function TextToolbar({ mark = [], formating = [],  list =[]}: IProps) {
  const editor = useSlate();

  return <div>
    {
      mark.map(({ name, format, icon }) => {
        return <MarkButton key={format} name={name} editor={editor} format={format} icon={icon} />
      })
    }
    {
      formating.map(({ name, format, icon }) => {
        return <BlockButton key={format} name={name} editor={editor} format={format} icon={icon} />
      })
    }
    {
      list.map(({ name, format, icon }) => {
        return <BlockButton key={format} name={name} editor={editor} format={format} icon={icon} />
      })
    }
  </div>
}