import { useCallback, useEffect, useMemo, useState } from 'react';
import { createEditor, Descendant, Editor, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { RenderElement, RenderElementProps } from './render.element';
import { RenderLeaf, RenderLeafProps } from './render.leaf';
import { TextToolbar } from './text.toolbar';
import { withSoftBreaks } from './text.withsoftbreak';
import { textHelper } from './helpers/text.helper';

export interface OnChangeParams {
  data: Descendant[];
  value: string;
}

interface IProps {
  data?: Descendant[] | null;
  readOnly?: boolean;
  onChange?: (params: OnChangeParams) => void;
  onClick?: () => void;
}



export function TextEditor({ data, readOnly, onChange }: IProps) {

  const editor = useMemo(() => withHistory(withReact(withSoftBreaks(createEditor()))), []);
  const [value, setValue] = useState<Descendant[]>(data || [{ type: 'paragraph', children: [{ text: '' }] }]);
  const renderElement = useCallback((props: RenderElementProps) => <RenderElement {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <RenderLeaf {...props} />, []);

  useEffect(() => {
    if (!readOnly) {
      ReactEditor.focus(editor);
      Transforms.select(editor, Editor.end(editor, []));
    }
  }, [editor, readOnly]);


  const handleChange = (newValue: Descendant[]) => {
    setValue(newValue);
    const html = textHelper.serialize(newValue);
    onChange && onChange({ data: newValue, value: html });
  };

  const handleDOMBeforeInput = (event: InputEvent) => {
    const inputType = event.inputType;
    if (inputType === 'insertText') {
      const textLength = Editor.string(editor, []).length;
      if (textLength >= 20) {
        event.preventDefault();
        return;
      }
    }
  };

  return (
    <Slate editor={editor} onChange={handleChange} initialValue={value}>
      {
        !readOnly && <TextToolbar />
      }
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some plain text..."
        readOnly={readOnly}
        onDOMBeforeInput={handleDOMBeforeInput}
        onClick={(e) => !readOnly && e.stopPropagation()}
      />
    </Slate>
  );
}








/*

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

