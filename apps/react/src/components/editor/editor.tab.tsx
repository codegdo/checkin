interface IProps {
  setTab: React.Dispatch<React.SetStateAction<string>>
}

function EditorTab({setTab}: IProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    console.log(event.currentTarget.name);
    setTab(event.currentTarget.name);
  }
  return <div>
    <button type="button" name="content" onClick={handleClick}>tab 1</button>
    <button type="button" name="design" onClick={handleClick}>tab 2</button>
    <button type="button" name="setting" onClick={handleClick}>tab 3</button>
  </div>
}

export default EditorTab;

