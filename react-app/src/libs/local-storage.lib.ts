export interface StorageItem {
  name: string;
  value: string | null;
}

class LocalStorageLibrary {
  private set(name: string, value: string): void {
    if (localStorage) {
      localStorage.setItem(name, value);
    } else {
      new Error('Browser does not support the localStorage API');
    }
  }

  private get(name: string): string | null {
    return localStorage.getItem(name);
  }

  setItem(name: string, value: string): void {
    this.set(name, value);
  }

  getAllItems(): StorageItem[] {
    const list: StorageItem[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const name = localStorage.key(i) || '';
      const value = localStorage.getItem(name);

      list.push({
        name,
        value,
      });
    }

    return list;
  }

  getItem(name: string): string | null {
    return this.get(name);
  }

  removeItem(name: string): void {
    localStorage.removeItem(name);
  }

  clear(): void {
    localStorage.clear();
  }
}

export const localStore = new LocalStorageLibrary();

