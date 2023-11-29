import { Field } from "@/components/types";

export interface SortableField extends Field { }

export interface SortableState {
  data: SortableField[];
  item?: Partial<SortableField> | null;
  isEditing?: boolean;
  isSelecting?: boolean;
}