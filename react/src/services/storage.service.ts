export interface StorageItem {
  name: string;
  value: string | null;
}

class LocalStorageService {
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

class SessionStorageService {
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

class CookieStorageService {
  setCookie(name: string, value: string, days: number) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  getCookie(name: string) {
    let key = name + "=";
    let cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(key) == 0) {
        return c.substring(key.length, c.length);
      }
    }
    return "";
  }

  checkCookie() {
    let user = this.getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        this.setCookie("username", user, 365);
      }
    }
  }
}

export const cookieStore = new CookieStorageService();
export const localStore = new LocalStorageService();
export const sessionStore = new SessionStorageService();
