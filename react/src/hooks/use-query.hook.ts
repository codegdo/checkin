import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

export const useQuery = (): queryString.ParsedQuery<string> => {
  //return new URLSearchParams(useLocation().search);
  return queryString.parse(useLocation().search);
}