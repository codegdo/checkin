export interface PaginationProps {
  className?: string;
  count?: number;
  current?: number;
  boundary?: number;
  sibling?: number;
  status?: string;
  disabled?: boolean;
  onClick?: (payload: { key?: string, value?: string }) => void;
}