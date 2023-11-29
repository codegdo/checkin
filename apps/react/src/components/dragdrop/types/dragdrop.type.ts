import { Field } from "@/components/types";

export interface DndField extends Field {
  selected?: boolean;
}

export interface DndState {
  data: DndField[];
  item?: Partial<DndField> | null;
  isEditing?: boolean;
  isSelecting?: boolean;
}