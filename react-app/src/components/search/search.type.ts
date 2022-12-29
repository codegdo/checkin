
export interface SearchProps {
  className?: string;
  filters?: any[];
  onCallback?: (payload: { key?: string, name?: string, value?: string }) => void;
}