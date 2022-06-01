export const isJsonString = (str: string) => {
  try {
    const json = JSON.parse(str);

    if (json && typeof json !== 'object') {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};
