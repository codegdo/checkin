import { SearchQuery } from "../components/gridview/gridview.type";

class SearchHelper {
  constructor() { }

  mapKeys(keys: string[], value: string) {
    // keys = ['name', 'email']
    // value = 'abc'
    // output = 'name=abc&email=abc'
    return keys.map(key => value ? `${key}=${value}` : '').filter(Boolean).join('&');
  }

  filterKeys() {

  }

  stringify({
    searchKeys = [],
    searchValue = '',
    sortColumn = '',
    sortDirection = 'asc',
    pageLimit = 0,
    pageOffset = 0 }: SearchQuery) {

    const searchString = this.mapKeys(searchKeys, searchValue);
    const sortString = sortColumn ? `sortColumn=${sortColumn}&sortDirection=${sortDirection}` : '';
    const pageString = pageLimit ? `limit=${pageLimit}&offset=${pageOffset}` : '';
    const queryString = [searchString, sortString, pageString].filter(Boolean).join('&');

    return queryString ? `?${queryString}` : '';
  }
}

export const searchHelper = new SearchHelper();
