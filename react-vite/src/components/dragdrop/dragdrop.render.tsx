export const DragDropRender: React.FC = (): JSX.Element => {
  const context = useWrapperContext(DragDropContext);
  const data = formHelper.mapField(context?.state?.data);

  console.log(data);

  return (
    <DragDropBlock
      id="dropzone"
      className="form"
      name="block"
      dataType="dropzone"
      {...context}
    >
      <Render data={data} />
    </DragDropBlock>
  );
};