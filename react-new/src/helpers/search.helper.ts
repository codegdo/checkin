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

  stringify(option: { keys?: [], value?: string, column?: number, direction?: number, limit?: number, offset?: number } = {}) {
    const { keys = [], value = '', column = null, direction = null, limit = 10, offset = 0 } = option;
    const searchString = this.mapKeys(keys, value);

  }
}

export const searchHelper = new SearchHelper();
