class StyleHelper {
  setHeadStyle(id: string, css: string) {
    const head = document.head || document.getElementsByTagName('head')[0];
    //const body = document.body || document.getElementsByTagName('body')[0];
    const [found] = Array.from(head.children).filter(child => child.id === id);

    //body.toggleAttribute('data-scheme-dark');

    if (!found) {
      const style = document.createElement('style');

      style.setAttribute('type', 'text/css');
      style.setAttribute('id', id);
      style.innerHTML = css;

      head.appendChild(style);
    } else {
      found.innerHTML = css;
    }
  }
}

export const styleHelper = new StyleHelper();