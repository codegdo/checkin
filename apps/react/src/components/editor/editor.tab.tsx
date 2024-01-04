import { Tab, ActionType, ContextValue } from './types';

interface IProps {
  context: ContextValue
}

function EditorTab({ context }: IProps) {
  const { tabs, state, dispatch } = context;

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

