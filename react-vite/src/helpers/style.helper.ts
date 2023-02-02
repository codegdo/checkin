class StyleHelper {
  setHeadStyle(id: string, css: string) {
    const head = document.head || document.getElementsByTagName('head')[0];
    const [exist] = Array.from(head.children).filter(child => child.id === id);

    if (!exist) {
      const style = document.createElement('style');

      style.setAttribute('type', 'text/css');
      style.setAttribute('id', id);
      style.innerHTML = css;

      head.appendChild(style);
    } else {
      exist.innerHTML = css;
    }
  }
}

export const styleHelper = new StyleHelper();