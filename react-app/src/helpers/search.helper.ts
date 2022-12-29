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

  search<T>(object: T, keys: Array<keyof T>, value: string): boolean {

    if (value === '') {
      return true;
    }

    const expression = keys.map(key => {
      const val = object[key];

      if (typeof val === 'string' || typeof val === 'number') {
        return val.toString().includes(value);
      }

      return false;
    });

    // some [true, false] = true
    return expression.some(expression => expression);
  }

  filter<T>(object: T, keys: Array<keyof T>): boolean {

    const expression = keys.map(key => {
      // object = undefined, null, NaN
      // string = ''
      // number = 0
      // boolean = false
      return object[key] ? true : false;
    });

    // every [true, false] = false
    return expression.every(expression => expression);
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
