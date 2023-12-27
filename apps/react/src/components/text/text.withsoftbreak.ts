import { BaseEditor, Editor, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const withSoftBreaks = (editor: BaseEditor & ReactEditor) => {
  const { insertText, insertBreak } = editor;

  editor.insertText = (text) => {
    if (text === '\n') {
      // Check if Shift key is pressed when Enter is triggered
      const { selection } = editor;

      if (selection && Editor.string(editor, selection) === '') {
        Transforms.insertText(editor, '\n');
        return;
      }
    }
    insertText(text);
  };

  editor.insertBreak = () => {
    // Check if Shift key is pressed when Enter is triggered
    const { selection } = editor;

    if (selection && Editor.string(editor, selection) === '') {
      Transforms.insertText(editor, '\n');
      return;
    }

    insertBreak();
  };

  return editor;
};