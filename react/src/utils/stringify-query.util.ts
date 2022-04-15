export const stringifyQuery = (query: string = '', values: any): string => {
  const queries = query.split('&');

  const qs = queries.reduce((q: string[], i) => {

    const k = i.split('=');
    k[1] = values[k[1]] || k[1];

    return [...q, k.join('=')];
  }, []).join('&');

  return qs ? `?${qs}` : qs;
}