import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type BlockType = 'paragraph' | 'quote' | 'code' | 'bulleted-list' | 'heading-one' | 'heading-two' | 'heading-three' | 'heading-four' | 'heading-five' | 'heading-six' | 'list-item' | 'numbered-list';
export type InlineType = 'bold' | 'code' | 'italic' | 'underline' | 'strikethrough';
export type ToolbarButtonType = 'mark' | 'block';

export type CustomElement = { type: BlockType; children: CustomText[] }
export type CustomText = { text: string; bold?: true }
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export interface IToolbarButton {
  name: ToolbarButtonType;
  format: string;
  icon: string;
}


declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}

export interface KeyValue {
  [key: string]: string | Descendant[];
}