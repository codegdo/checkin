import { ActionType } from './types';

export interface IDropMenu {
  onClick?: (name: keyof typeof ActionType) => void;
}

function DropMenu({ onClick }: IDropMenu) {

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, name: keyof typeof ActionType) => {
    event.stopPropagation();
    onClick && onClick(name);
  };

  return (
    <div>
      <button type="button" onClick={(e) => handleClick(e, ActionType.OPEN_EDITING)}>Edit</button>
      <button type="button" onClick={(e) => handleClick(e, ActionType.REMOVE_ITEM)}>Remove</button>
    </div>
  )
}

export default DropMenu;