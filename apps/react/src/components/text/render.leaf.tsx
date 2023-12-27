import { PropsWithChildren } from "react";
import { RenderLeafProps as SlateRenderLeafProps } from "slate-react";


export interface CustomText {
  text: string;
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  // Add other custom formatting properties here
}

export type RenderLeafProps = PropsWithChildren<SlateRenderLeafProps>;

export function RenderLeaf({ attributes, children, leaf }: RenderLeafProps) {
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
