import { PropsWithChildren } from "react";
import { RenderLeafProps } from "slate-react";


export interface CustomText {
  text: string;
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

export type LeafRenderProps = PropsWithChildren<RenderLeafProps>;

export function LeafRender({ attributes, children, leaf }: LeafRenderProps) {
  const { bold, code, italic, underline, strikethrough } = leaf as CustomText;

  if (bold) {
    children = <strong>{children}</strong>;
  }

  if (code) {
    children = <code>{children}</code>;
  }

  if (italic) {
    children = <em>{children}</em>;
  }

  if (underline) {
    children = <u>{children}</u>;
  }

  if (strikethrough) {
    children = <del>{children}</del>;
  }

  return <span {...attributes}>{children}</span>;
}
