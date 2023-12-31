import { useCallback, useEffect, useMemo } from 'react';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { createEditor, Descendant, Editor, Transforms } from 'slate';
import { withHistory } from 'slate-history';

import { textHelper } from './helpers';
import { IBlockButton, IMarkButton, KeyValue } from './types';
import { withSoftBreaks } from './hoc';

import { ElementRender, ElementRenderProps } from './element.render';
import { LeafRender, LeafRenderProps } from './leaf.render';
import { TextToolbar } from './text.toolbar';

export interface OnChangeParams {
  data: Descendant[];
  value: string;
}

interface Options {
  formating?: IBlockButton[],
  mark?: IMarkButton[],
  list?: IBlockButton[],
  alignment?: IBlockButton[],
  //table?: IBlockButton[],
  //history?: IBlockButton[],
  //media?: IBlockButton[],
  //link?: IBlockButton[],
  //color?: IBlockButton[],
  //code?: IBlockButton[],
  //clear?: IBlockButton[],
  //search?: IBlockButton[],
  //symbol?: IBlockButton[]
}

interface IProps {
  id?: string | number | null;
  data?: Descendant[] | null;
  placeholder?: string;
  readOnly?: boolean;
  options?: Options;
  onChange?: (keyvalue: KeyValue) => void;
}

const defaultValue: Descendant[] = [{ type: 'paragraph', children: [{ text: '' }] }];

export function TextEditor({ data, placeholder = 'Enter some plain text...', readOnly, options = {}, onChange }: IProps) {
  const editor = useMemo(() => withHistory(withReact(withSoftBreaks(createEditor()))), []);

  const renderElement = useCallback((props: ElementRenderProps) => <ElementRender {...props} />, []);
  const renderLeaf = useCallback((props: LeafRenderProps) => <LeafRender {...props} />, []);

  const handleChange = (newValue: Descendant[]) => {
    const html = textHelper.serialize(newValue);
    onChange?.({ data: newValue, value: html });
  };

  useEffect(() => {
    ReactEditor.focus(editor);
    Transforms.select(editor, Editor.end(editor, []));
  }, [editor]);

  return (
    <Slate editor={editor} onChange={handleChange} initialValue={data || defaultValue}>
      <div>
      <button type="button" onClick={editor.undo}>Undo</button>
      <button type="button" onClick={editor.redo}>Redo</button>
      </div>
      <TextToolbar mark={options.mark} formating={options.formating} list={options.list} />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder={placeholder}
        readOnly={readOnly}
        onClick={(event) => (event.stopPropagation())}
      />
    </Slate>
  );
}

// npx madge src/components/text/text.editor.tsx --image src/components/text/text.graph.png --warning





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

