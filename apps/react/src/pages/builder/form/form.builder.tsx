import { Loader, DragDrop } from "@/components";
import { useApi } from "@/hooks";
import { useGetFormById } from "./api/use-form.api";

function FormBuilder() {
  const { status, data: formData, controller } = useApi<ReturnType<typeof useGetFormById>>('useGetFormById');

  if (!formData) {
    return <Loader status={status} controller={controller} />;
  }

  return (
    <DragDrop
      data={formData?.data}
      drags={{
        elements: ['section', 'block', 'button', 'link', 'text'],
        fields: formData?.fields
      }}
      options={{
        historyId: formData.id,
        historyVersion: formData.updatedAt
      }}
    />
  );
}

export default FormBuilder;