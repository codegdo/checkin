interface IProps {
  tab: string;
}

function EditorContent({tab}: IProps) {
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
  }
  switch(tab) {
    case'content':
      return <div key={tab}><input onChange={handleChange} /></div>;
    case'design':
      return <div key={tab}><input onChange={handleChange} /></div>;
    case'setting':
      return <div key={tab}><input onChange={handleChange} /></div>;
    default:
      return null;
  }
}

export default EditorContent;

