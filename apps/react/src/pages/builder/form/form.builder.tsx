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
    dragData={formData?.fields}
    dragElements={['section', 'block', 'button', 'link', 'text']}
    option={{
      trackingId: formData.id,
      trackingVersion: formData.version
    }}
  />;
}

export default FormBuilder;