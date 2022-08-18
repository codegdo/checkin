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

  filter<T>(object: T, keys: Array<keyof T>, query: string): boolean {

    if (query === '') {
      return true;
    }

    const expression = keys.map(key => {
      const value = object[key];

      if (typeof value === 'string' || typeof value === 'number') {
        return value.toString().includes(query);
      }

      return false;
    });

    return expression.some(expression => expression);

  }

  sort<T>(a: T, b: T, key: keyof T, direction: string) {

    let x = 0;

    if (direction !== 'desc' && direction !== 'asc') {
      return 0;
    }

    if (a[key] > b[key]) {
      x = 1;
    };

    if (a[key] < b[key]) {
      x = -1
    };

    return direction === 'desc' ? x * -1 : x;
  }

  search() { }

  query({
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
