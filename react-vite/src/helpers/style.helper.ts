class StyleHelper {
  private head: HTMLHeadElement;

  constructor() {
    this.head = document.head || document.getElementsByTagName('head')[0];
  }

  public setHeadStyle(id: string, css: string): void {
    const [exist] = Array.from(this.head.children).filter(child => child.id === id);

    if (!exist) {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.id = id;
      style.innerHTML = css;
      this.head.appendChild(style);
    } else {
      exist.innerHTML = css;
    }
  }
}

export const styleHelper = new StyleHelper();