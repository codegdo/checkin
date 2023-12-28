import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { withSoftBreaks } from './text.withsoftbreak';
import { textHelper } from './helpers/text.helper';
import { KeyValue } from './types';
import { RenderElement, RenderElementProps } from './render.element';
import { RenderLeaf, RenderLeafProps } from './render.leaf';
import { TextToolbar } from './text.toolbar';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';

export interface OnChangeParams {
  data: Descendant[];
  value: string;
}

interface IProps {
  id?: string | number | null;
  selectedId?: string | number | null;
  data?: Descendant[] | null;
  isEditing?: boolean;
  isSelected?: boolean;
  onChange?: (keyvalue: KeyValue) => void;
}

const defaultValue: Descendant[] = [{ type: 'paragraph', children: [{ text: '' }] }];


export function TextEditor({ id, selectedId, data, isEditing, isSelected, onChange }: IProps) {
  const editor = useMemo(() => withHistory(withReact(withSoftBreaks(createEditor()))), []);

  const renderElement = useCallback((props: RenderElementProps) => <RenderElement {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <RenderLeaf {...props} />, []);

  const [readOnly, setReadOnly] = useState<boolean>(!isEditing);

  const handleChange = (newValue: Descendant[]) => {
    const html = textHelper.serialize(newValue);
    onChange?.({ data: newValue, value: html });
  };

  useEffect(() => {
    setReadOnly(!isEditing);
  }, [isEditing]);

  useEffect(() => {
    console.log('isSelected', isSelected);
    if (isEditing && isSelected) {
      ReactEditor.focus(editor);
    }
  }, [editor, isEditing, isSelected]);

  console.log(id, selectedId);

  return (
    <Slate editor={editor} onChange={handleChange} initialValue={data || defaultValue}>
      {isSelected && <TextToolbar />}
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some plain text..."
        readOnly={readOnly}
        onClick={(event) => (isEditing && event.stopPropagation())}
      />
    </Slate>
  );
}





/*
// const handleDOMBeforeInput = (event: InputEvent) => {
  //   const inputType = event.inputType;
  //   if (inputType === 'insertText') {
  //     const textLength = Editor.string(editor, []).length;
  //     if (textLength >= 20) {
  //       event.preventDefault();
  //       return;
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (data) {
  //     Transforms.select(editor, Editor.end(editor, []));
  //     Transforms.removeNodes(editor, { at: editor.selection || undefined });
  //     Transforms.insertNodes(editor, data);
  //   }
  // }, [data, editor]);

  // useEffect(() => {
  //   editor.children = data || defaultValue;
  //   forceUpdate();
  // }, [editor, data, forceUpdate]);

  // useEffect(() => {
  //   if (isEditing) {
  //     ReactEditor.focus(editor);
  //     Transforms.select(editor, Editor.end(editor, []));
  //   }
  // }, [editor, isEditing]);
// Custom function to serialize Slate value to HTML
const serialize = (nodes: Descendant[]): string => {
  return nodes.map(node => {
    if ('type' in node && 'children' in node) {
      // Handle paragraph nodes
      if (node.type === 'paragraph') {
        return node.children.map((child) => {
          if ('text' in child) {
            const { text, ...customProps } = child as CustomText;
            let serializedText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

            if (customProps.bold) {
              serializedText = `<strong>${serializedText}</strong>`;
            }

            if (customProps.code) {
              serializedText = `<code>${serializedText}</code>`;
            }

            if (customProps.italic) {
              serializedText = `<em>${serializedText}</em>`;
            }

            if (customProps.underline) {
              serializedText = `<u>${serializedText}</u>`;
            }

            return `<p>${serializedText}</p>`;
          }

          // Handle other text-based node types if needed
          // For example, code blocks, headings, etc.

          return '';
        }).join('');
      }

      // Handle other block-level nodes if needed
      // For example, list items, headings, etc.

      return '';
    }

    // Handle other node types like inline elements, etc.

    return '';
  }).join('');
};
  //const stringValue = Editor.string(editor, []);
  //console.log('change', newValue, stringValue);

 useEffect(() => {
    // const { normalizeNode } = editor;

    // editor.normalizeNode = ([node, path]) => {
    //   if (path.length === 0) {
    //     if (editor.children.length > 1) {
    //       Transforms.mergeNodes(editor);
    //     }
    //   }

    //   return normalizeNode([node, path]);
    // };
  }, [editor]);

  useEffect(() => {
    console.log(value, editor);
  }, [editor, value]);
*/

