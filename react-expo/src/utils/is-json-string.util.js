export const isJsonString = (str) => {
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
