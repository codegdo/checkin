import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type BlockType = 'paragraph' | 'quote' | 'code' | 'bulleted-list' | 'heading-one' | 'heading-two' | 'heading-three' | 'heading-four' | 'heading-five' | 'heading-six' | 'list-item' | 'numbered-list';
export type MarkType = 'bold' | 'code' | 'italic' | 'underline' | 'strikethrough';
export type ButtonType = 'mark' | 'block';

export type CustomElement = { 
  type: BlockType; 
  align?: string;
  children: TextData[] 
}
export type TextData = { text: string; bold?: true }
export type SlateEditor = BaseEditor & ReactEditor & HistoryEditor;


export interface IButtonMark {
  name: MarkType;
  icon: string;
}

export interface IButtonBlock{
  name: BlockType;
  icon: string;
}

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

export const LIST_TYPES = ['numbered-list', 'bulleted-list'];
export const TEXT_BLOCK_TYPES = ['paragraph', 'heading-one', 'heading-two', 'heading-three', 'heading-four', 'heading-five', 'heading-six', 'quote'];
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']
