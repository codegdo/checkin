
function EditorContent() {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
  }
  return <div><input onChange={handleChange} /></div>;
}

export default EditorContent;

