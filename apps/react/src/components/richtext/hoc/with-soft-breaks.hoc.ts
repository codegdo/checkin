import { Editor, Transforms } from "slate";
import { SlateEditor } from "../types";

export const withSoftBreaks = (editor: SlateEditor) => {
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