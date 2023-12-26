import { useCallback, useEffect, useMemo, useState } from 'react';
import { createEditor, Descendant, Editor, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact, ReactEditor, useSlate } from 'slate-react';
import { RenderElement, RenderElementProps } from './render.element';
import { RenderLeaf, RenderLeafProps } from './render.leaf';
import { TextToolbar } from './text.toolbar';

interface IProps {
  value?: string | null;
  data?: Descendant[] | null;
  readOnly?: boolean;
}

// Custom function to serialize Slate value to HTML
const serialize = (nodes: Descendant[]): string => {
  return nodes.map(node => {

    console.log(node);

    if (Editor.isEditor(node)) {
      return node.children.map(n => serialize([n])).join('');
    }

    if (node.text) {
      let text = node.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      if (node.bold) {
        text = `<strong>${text}</strong>`;
      }
      // Add other formatting checks and replacements as needed (italic, underline, etc.)
      return text;
    }

    return '';
  }).join('');
};

export function Text({ readOnly, data = [{ type: 'paragraph', children: [{ text: '' }] }] }: IProps) {

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>(data);
  const renderElement = useCallback((props: RenderElementProps) => <RenderElement {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <RenderLeaf {...props} />, []);

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

  useEffect(() => {
    console.log('readOnly', readOnly);
    if (!readOnly) {
      ReactEditor.focus(editor);
      Transforms.select(editor, Editor.end(editor, []));
    }
  }, [editor, readOnly]);


  const handleChange = (newValue: Descendant[]) => {
    //const stringValue = Editor.string(editor, []);
    //console.log('change', newValue, stringValue);
    setValue(newValue);

    // Get rich text (HTML) from Slate value
    const html = serialize(newValue);
    console.log('Rich Text (HTML):', html);
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
        onClick={(e) => e.stopPropagation()}
      />
    </Slate>
  );
}

