export interface PagingProps {
  className?: string;
  total?: number;
  limit?: number;
  current?: number;
  onClick?: (payload: { key?: string, value?: string }) => void;
}