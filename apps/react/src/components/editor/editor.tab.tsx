import { useWrapperContext } from "@/hooks";
import { Tab, ActionType } from './types';
import EditorContext from "./editor.provider";

function EditorTab() {
  const { tabs, state, dispatch } = useWrapperContext(EditorContext);


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, tab: Tab) => {
    event.stopPropagation();

    dispatch({
      type: ActionType.SELECT_TAB,
      payload: { tab }
    });

    console.log(tab, state);
  }

  return <div>
    {
      tabs.map(tab => {
        return <button key={tab.id} type="button" onClick={(e) => handleClick(e, tab)}>{tab.title}</button>
      })
    }
  </div>
}

export default EditorTab;

