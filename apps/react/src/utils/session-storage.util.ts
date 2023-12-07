const saveToSessionStorage = <T>(key: string, data: T) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to sessionStorage:`, error);
  }
};

const retrieveFromSessionStorage = (key: string) => {
  try {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error retrieving ${key} from sessionStorage:`, error);
    return null;
  }
};

const getSessionStorage = <T>(keys: string[]): Record<string, T> => {
  const data: Record<string, T> = {};

  keys.forEach((key) => {
    try {
      const item = sessionStorage.getItem(key);
      if (item !== null) {
        data[key] = JSON.parse(item);
      }
    } catch (error) {
      console.error(`Error retrieving ${key} from sessionStorage:`, error);
    }
  });

  return data;
};

const setSessionStorage = <T>(data: Record<string, T>) => {
  Object.keys(data).forEach((key) => {
    saveToSessionStorage(key, data[key]);
  });
};

export { saveToSessionStorage, retrieveFromSessionStorage, getSessionStorage, setSessionStorage };
