export type ConcatUrl = {
  url?: string;
  pathname?: string;
  search?: string;
}
export const concatUrl = ({ url = '', pathname = '', search = '' }: ConcatUrl): string => {
  return `${url}${pathname}${search}`;
}