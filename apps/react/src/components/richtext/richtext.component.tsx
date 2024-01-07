import { useCallback, useEffect, useMemo } from 'react';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { createEditor, Descendant, Editor, Transforms } from 'slate';
import { withHistory } from 'slate-history';

import { textHelper } from './helpers';
import { IButtonBlock, IButtonMark, KeyValue } from './types';
import { withSoftBreaks } from './hoc';

import { ElementRender, ElementRenderProps } from './element.render';
import { LeafRender, LeafRenderProps } from './leaf.render';
import { TextToolbar } from './richtext.toolbar';

export interface OnChangeParams {
  data: Descendant[];
  value: string;
}

interface Options {
  textButtons?: IButtonBlock[],
  markButtons?: IButtonMark[],
  listButtons?: IButtonBlock[],
  alignButtons?: IButtonBlock[],
  historyButtons?: IButtonBlock[],
  //table?: IButtonBlock[],
  //media?: IButtonBlock[],
  //link?: IButtonBlock[],
  //color?: IButtonBlock[],
  //code?: IButtonBlock[],
  //clear?: IButtonBlock[],
  //search?: IButtonBlock[],
  //symbol?: IButtonBlock[]
}

interface IProps {
  id?: string | number | null;
  data?: Descendant[] | null;
  placeholder?: string;
  readOnly?: boolean;
  options?: Options;
  onChange?: (keyvalue: KeyValue) => void;
}

const defaultValue: Descendant[] = [{ type: 'paragraph', children: [{ text: '' }] }];

export function RichText({ data, placeholder = 'Enter some plain text...', readOnly, options = {}, onChange }: IProps) {
  const editor = useMemo(() => withHistory(withReact(withSoftBreaks(createEditor()))), []);

  const renderElement = useCallback((props: ElementRenderProps) => <ElementRender {...props} />, []);
  const renderLeaf = useCallback((props: LeafRenderProps) => <LeafRender {...props} />, []);

  const handleChange = (newValue: Descendant[]) => {
    const html = textHelper.serialize(newValue);
    onChange?.({ data: newValue, value: html });
  };

  useEffect(() => {
    ReactEditor.focus(editor);
    Transforms.select(editor, Editor.end(editor, []));
  }, [editor]);

  return (
    <Slate editor={editor} onChange={handleChange} initialValue={data || defaultValue}>
      <TextToolbar 
        markButtons={options.markButtons} 
        textButtons={options.textButtons} 
        listButtons={options.listButtons} 
        alignButtons={options.alignButtons}
        historyButtons={options.historyButtons}
      />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder={placeholder}
        readOnly={readOnly}
        onClick={(event) => (event.stopPropagation())}
      />
    </Slate>
  );
}

// npx madge src/components/text/text.editor.tsx --image src/components/text/text.graph.png --warning
