function objClone<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => objClone(item)) as unknown as T;
  }

  const copy: unknown = {};

  for (const key in obj) {
    (copy as Record<string, unknown>)[key] = objClone(
      (obj as Record<string, unknown>)[key]
    );
  }

  return copy as T;
}

export default objClone;
