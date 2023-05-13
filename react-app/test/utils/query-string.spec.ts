import { describe, expect, test } from 'vitest';
import qs from 'query-string';

import { stringifyUrl } from '../../src/utils';

describe('stringifyUrl', () => {
  test('returns the expected string for a simple case', () => {
    const url = 'https://example.com/path';
    const query = { key: 'value' };
    const expectedResult = `${url}?${qs.stringify(query)}`;

    expect(stringifyUrl(url, query)).toBe(expectedResult);
  });

  test('handles empty query object correctly', () => {
    const url = 'https://example.com/path';
    const expectedResult = `${url}`;

    expect(stringifyUrl(url)).toBe(expectedResult);
  });

  test('handles URL-encoded values correctly', () => {
    const url = 'https://example.com/path';
    const query = { key: 'value with spaces' };
    const expectedResult = `${url}?${qs.stringify(query)}`;

    expect(stringifyUrl(url, query)).toBe(expectedResult);
  });
});