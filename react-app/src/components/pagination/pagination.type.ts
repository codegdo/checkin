export interface PaginationProps {
  className?: string;
  count?: number;
  current?: number;
  boundary?: number;
  sibling?: number;
  status?: string;
  disabled?: boolean;
  onCallback?: (payload: { key?: string, name?: string, value?: string }) => void;
}