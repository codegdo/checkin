
export interface SearchProps {
  className?: string;
  filters?: any[];
  onClick?: (payload: { key?: string, value?: string }) => void;
}