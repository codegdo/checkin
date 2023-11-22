export const stringifyUrl = (url: string, query: Record<string, unknown> = {}): string => {
  const queryString = Object.entries(query)
    .map(([key, value]) => {
      if (typeof key !== 'string' || (typeof value !== 'string' && typeof value !== 'number')) {
        throw new Error('Invalid query parameter type');
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');

  if (queryString) {
    return `${url}?${queryString}`;
  } else {
    return url;
  }
};
