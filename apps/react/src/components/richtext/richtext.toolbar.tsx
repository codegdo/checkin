import { useSlate } from "slate-react";

import { IButtonBlock, IButtonMark } from "./types";
import { ButtonText } from "./button.text";
import { ButtonMark } from "./button.mark";
import { ButtonList } from "./button.list";
import { ButtonAlign } from "./button.align";
import { ButtonHistory } from "./button.history";

interface IProps {
  markButtons?: IButtonMark[],
  textButtons?: IButtonBlock[],
  listButtons?: IButtonBlock[],
  alignButtons?: IButtonBlock[],
  historyButtons?: IButtonBlock[]
}

export function TextToolbar({ markButtons = [], textButtons = [], listButtons = [], alignButtons = [], historyButtons = []}: IProps) {
  const editor = useSlate();

  return <div>
    {
      historyButtons.map(({ name, icon }) => {
        return <ButtonHistory key={name} name={name} editor={editor} icon={icon} />
      })
    }
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
    {
      alignButtons.map(({ name, icon }) => {
        return <ButtonAlign key={name} name={name} editor={editor} icon={icon} />
      })
    }
  </div>
}