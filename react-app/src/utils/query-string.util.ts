import qs from 'query-string';

export const stringifyUrl = (url: string, query: object = {}): string => {
  return qs.stringifyUrl({ url, query: { ...query } })
}