import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type BlockType = 'paragraph' | 'quote' | 'code' | 'bulleted-list' | 'heading-one' | 'heading-two' | 'heading-three' | 'heading-four' | 'heading-five' | 'heading-six' | 'list-item' | 'numbered-list';
export type InlineType = 'bold' | 'code' | 'italic' | 'underline' | 'strikethrough';
export type ButtonType = 'mark' | 'block';

export type CustomElement = { type: BlockType; children: TextData[] }
export type TextData = { text: string; bold?: true }
export type SlateEditor = BaseEditor & ReactEditor & HistoryEditor;

export interface MarkButton {
  name: ButtonType;
  format: string;
  icon: string;
}

export interface BlockButton extends MarkButton {}

declare module 'slate' {
  interface CustomTypes {
    Editor: SlateEditor
    Element: CustomElement
    Text: TextData
  }
}

export interface KeyValue {
  [key: string]: string | Descendant[];
}