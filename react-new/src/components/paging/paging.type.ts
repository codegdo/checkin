export interface PagingProps {
  className?: string;
  total?: number;
  onClick?: (payload: { key?: string, value?: string }) => void;
}