export interface StorageItem {
  key: string;
  value: string | null;
}

class LocalStorageService {
  private set(key: string, item: string): void {
    if (localStorage) {
      localStorage.setItem(key, item);
    } else {
      new Error('Browser does not support the localStorage API');
    }
  }

  private get(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, item: string): void {
    this.set(key, item);
  }

  getAllItems(): StorageItem[] {
    const list: StorageItem[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) || '';
      const value = localStorage.getItem(key);

      list.push({
        key,
        value,
      });
    }

    return list;
  }

  getItem(key: string): string | null {
    return this.get(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}

export const storage = new LocalStorageService();
