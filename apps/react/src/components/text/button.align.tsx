import { MouseEvent } from 'react';
import { Editor, Element as SlateElement, Transforms } from 'slate';

import { IButtonBlock, LIST_TYPES, SlateEditor, TEXT_ALIGN_TYPES } from './types';

type IProps = IButtonBlock & {
  editor: SlateEditor;
}

export function ButtonAlign({ name, editor }: IProps) {
  const isBlockActive = () => {
    const { selection } = editor
    if (!selection) return false
  
    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n => {
          return (
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.align === name
          )
        },
      })
    )
  
    return !!match
  }
  const toggleBlock = () => {
    const isActive = isBlockActive()
    const isList = LIST_TYPES.includes(name)
  
    Transforms.unwrapNodes(editor, {
      match: n => {
        return (
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          !TEXT_ALIGN_TYPES.includes(name)
        )
      },
      split: true,
    });

    const newProperties: Partial<SlateElement> = {
      align: isActive ? undefined : name,
    }
    
    Transforms.setNodes<SlateElement>(editor, newProperties)
  
    if (!isActive && isList) {
      const block = { type: name, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  };

  const handleOnMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleBlock();
  }

  return (
    <button
      type="button"
      name={name}
      className={isBlockActive() ? 'active' : ''}
      onMouseDown={handleOnMouseDown}
    >
      {name}
    </button>
  );
}