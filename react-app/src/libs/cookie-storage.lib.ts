class CookieStorageLibrary {
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

export const cookieStore = new CookieStorageLibrary();