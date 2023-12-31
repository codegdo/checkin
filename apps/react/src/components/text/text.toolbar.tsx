import { useSlate } from "slate-react";

import { IButtonBlock, IButtonMark } from "./types";
import { ButtonText } from "./button.text";
import { ButtonMark } from "./button.mark";
import { ButtonList } from "./button.list";

interface IProps {
  markButtons?: IButtonMark[],
  textButtons?: IButtonBlock[],
  listButtons?: IButtonBlock[]
}

export function TextToolbar({ markButtons = [], textButtons = [],  listButtons =[]}: IProps) {
  const editor = useSlate();

  return <div>
    {
      markButtons.map(({ name, icon }) => {
        return <ButtonMark key={name} name={name} editor={editor} icon={icon} />
      })
    }
    {
      textButtons.map(({ name, icon }) => {
        return <ButtonText key={name} name={name} editor={editor} icon={icon} />
      })
    }
    {
      listButtons.map(({ name, icon }) => {
        return <ButtonList key={name} name={name} editor={editor} icon={icon} />
      })
    }
  </div>
}