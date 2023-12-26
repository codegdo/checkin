import { PropsWithChildren } from "react";
import { Text } from 'slate';
import { RenderLeafProps as SlateRenderLeafProps } from "slate-react";

interface CustomRenderLeafProps extends SlateRenderLeafProps {

}

export type RenderLeafProps = PropsWithChildren<CustomRenderLeafProps>;

export function RenderLeaf({ attributes, children, leaf }: RenderLeafProps) {
  const { bold, code, italic, underline, strikethrough } = leaf as Text;

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
