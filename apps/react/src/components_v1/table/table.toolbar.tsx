export function TableToolbar() {
  const handleAdd = () => { };
  const handleEdit = () => { };
  return (
    <div>
      <button type="button" name="add" onClick={handleAdd}>Add</button>
      <input type="checkbox" name="edit" onClick={handleEdit} />
    </div>
  );
}