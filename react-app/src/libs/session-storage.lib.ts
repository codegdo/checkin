class SessionStorageLibrary {
  private set(name: string, value: string): void {
    if (sessionStorage) {
      sessionStorage.setItem(name, value);
    } else {
      new Error('Browser does not support the sessionStorage API');
    }
  }

  private get(name: string): string | null {
    return sessionStorage.getItem(name);
  }

  setItem(name: string, value: string): void {
    this.set(name, value);
  }

  getAllItems(): StorageItem[] {
    const list: StorageItem[] = [];

    for (let i = 0; i < sessionStorage.length; i++) {
      const name = sessionStorage.key(i) || '';
      const value = sessionStorage.getItem(name);

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
    sessionStorage.removeItem(name);
  }

  clear(): void {
    sessionStorage.clear();
  }
}

export const sessionStore = new SessionStorageLibrary();