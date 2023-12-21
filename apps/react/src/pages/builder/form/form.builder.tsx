import { Loader } from "@/components";
import { useGetFormById } from "./api/form.api";
import { DragDrop } from "@/components/dragdrop/dragdrop.component";

function FormBuilder() {
  const { status, data: formData, controller } = useGetFormById();

  if (!formData) {
    return <Loader status={status} controller={controller} />
  }

  return <DragDrop
    dropData={formData?.data}
    dragData={formData?.fields}
    drags={['section', 'block', 'button', 'link', 'text']}
    option={{
      historyId: formData.id,
      historyVersion: formData.updatedAt
    }}
  />;
}

export default FormBuilder;