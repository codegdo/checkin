import { MouseEvent } from 'react';
import { Editor, Element as SlateElement, Transforms } from 'slate';
import { IButtonBlock, SlateEditor } from './types';

type IProps = IButtonBlock & {
  editor: SlateEditor;
}

export function ButtonText({ name, editor }: IProps) {
  const isActive = () => {
    const { selection } = editor
    if (!selection) return false;

    const [match] = Array.from(
    Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n => {
          return (
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === name
          )
        },
      })
    )

    return !!match
  };

  const toggleBlock = () => {
    Transforms.unwrapNodes(editor, {
      match: n => {
        return !(
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type !== name 
        )
      },
      split: true,
    });

    const newProperties = { type: isActive() ? 'paragraph' : name };
    Transforms.setNodes(editor, newProperties);
  };

  const handleOnMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleBlock();
  }

  return (
    <button
      type="button"
      name={name}
      className={isActive() ? 'active' : ''}
      onMouseDown={handleOnMouseDown}
    >
      {name}
    </button>
  );
}
