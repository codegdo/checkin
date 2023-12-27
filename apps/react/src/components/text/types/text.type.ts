import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

type BlockType = 'paragraph' | 'quote' | 'code' | 'bulleted-list' | 'heading-one' | 'heading-two' | 'heading-three' | 'heading-four' | 'heading-five' | 'heading-six' | 'list-item' | 'numbered-list';

type CustomElement = { type: BlockType; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}