import { ChangeEvent } from "react";
import { Input, Label } from "../input";
import { ActionType, ContextValue, IControl } from "./types";

interface IProps extends IControl {
  context: ContextValue
}

function EditorText({ context, name, title, type }: IProps) {
  const { props, state, dispatch } = context;
  const value = state?.data && name ? state.data[name] : '';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    const keyvalue = { [name]: e.currentTarget.value };

    dispatch({
      type: ActionType.UPDATE_VALUE,
      payload: { keyvalue }
    });

    props?.onChange?.(keyvalue);
  }

  return <div>
    <Label title={title} />
    <Input name={name} type={type} value={value} onChange={handleChange} />
  </div>
}

export default EditorText;