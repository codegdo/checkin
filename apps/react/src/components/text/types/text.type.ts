import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

type BlockType = 'paragraph' | 'quote' | 'code' | 'bulleted-list' | 'heading-one' | 'heading-two' | 'heading-three' | 'heading-four' | 'heading-five' | 'heading-six' | 'list-item' | 'numbered-list';

type CustomElement = { type: BlockType; children: CustomText[] }
type CustomText = { text: string; bold?: true }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

export interface KeyValue {
  [key: string]: string | Descendant[];
}