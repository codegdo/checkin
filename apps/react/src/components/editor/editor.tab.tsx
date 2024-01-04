import { Tab, ActionType } from './types';
import { useEditorContext } from "./editor.provider";

function EditorTab() {
  const { tabs, state, dispatch } = useEditorContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, tab: Tab) => {
    event.stopPropagation();

    dispatch({
      type: ActionType.SELECT_TAB,
      payload: { tab }
    });

    console.log(tab, state);
  }

  return <div className='editor-tabs'>
    {
      tabs.map(tab => {
        return <button key={tab.name} type="button" onClick={(e) => handleClick(e, tab)}>{tab.title}</button>
      })
    }
  </div>
}

export default EditorTab;

