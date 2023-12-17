import { useWrapperContext } from "@/hooks";
import EditorContext from "./editor.provider";

interface IProps {
  setTab: React.Dispatch<React.SetStateAction<string>>
}

function EditorTab({setTab}: IProps) {
  const context = useWrapperContext(EditorContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    console.log(event.currentTarget.name, context);
    setTab(event.currentTarget.name);
  }
  
  return <div>
    <button type="button" name="content" onClick={handleClick}>tab 1</button>
    <button type="button" name="design" onClick={handleClick}>tab 2</button>
    <button type="button" name="setting" onClick={handleClick}>tab 3</button>
  </div>
}

export default EditorTab;

