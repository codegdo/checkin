import { describe, expect, test } from 'vitest';

import { randomString } from '../../src/utils';

describe('randomString', () => {
  test('returns a string with length 7', () => {
    expect(randomString().length).toBe(7);
  });

  test('prefixes the string correctly', () => {
    expect(randomString('prefix').startsWith('prefix-')).toBe(true);
  });

  test('should generate a string with the specified separator', () => {
    const result = randomString(undefined, '_');
    expect(result.includes('_')).toBe(true);
  });

  test('uses a random character when no prefix is provided', () => {
    const randomChar = randomString()[0];
    expect('abcdefghijklmnopqrstuvwxyz').toContain(randomChar);
  });

  test('uses a random string when no prefix is provided', () => {
    const randomStr = randomString().slice(2);
    expect(randomStr).toMatch(/[a-f0-9]{5}/);
  });
});