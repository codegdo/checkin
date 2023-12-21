import { Loader } from "@/components";
import { useGetFormById } from "./api/form.api";
import { DragDrop } from "@/components/dragdrop/dragdrop.component";

function FormBuilder() {
  const { status, data: formData, controller } = useGetFormById();

  if (!formData) {
    return <Loader status={status} controller={controller} />
  }

  return <DragDrop
    data={formData?.data}
    drags={{
      elements: ['section', 'block', 'button', 'link', 'text'],
      fields: formData?.fields
    }}
    options={{
      historyId: formData.id,
      historyVersion: formData.updatedAt
    }}
  />;
}

export default FormBuilder;