import { forwardRef, useState } from "react";
import { EditorProvider } from "./editor.provider";
import EditorHeader from "./editor.header";
import EditorTab from "./editor.tab";
import EditorContent from "./editor.content";

export interface KeyValue {
  key: string; 
  value: string;
} 
 
interface IProps {
  title: string;
  data?: Record<string, any>;
  onChange?: (keyvalue: KeyValue) => void;
}

export const Editor = forwardRef<HTMLDivElement, IProps>(({data = {}, onChange}, ref) => {
  const [tab, setTab] = useState('');
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange({key: '', value: event.target.value});
  }
  return <div className="editor">
    <EditorProvider value={{}}>
      <EditorHeader ref={ref} />
      <EditorTab setTab={setTab} />
      <EditorContent tab={tab} />
      <input onChange={handleChange} />
    </EditorProvider>
  </div>
});

// npx madge src/components/editor/editor.component.tsx --image src/components/editor/editor.graph.png --warning