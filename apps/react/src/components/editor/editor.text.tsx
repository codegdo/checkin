import { useEffect, useMemo, useRef, useState } from 'react';
import { createEditor, Descendant, Editor, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';

interface IProps {
  value?: string;
  readOnly?: boolean;
}

export function EditorText({ readOnly, value: text = '' }: IProps) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: "p",
      children: [
        {
          text,
          type: "text"
        }
      ]
    }
  ]);

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
    const stringValue = Editor.string(editor, []);
    console.log('change', newValue, stringValue);
    setValue(newValue);
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
      <Editable
        placeholder="Enter some plain text..."
        readOnly={readOnly}
        onDOMBeforeInput={handleDOMBeforeInput}
      />
    </Slate>
  );
}

