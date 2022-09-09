class DragDropHelper {
  constructor() { }

  parentNodeDisplay(parentNode: HTMLElement | null): string {
    let direction = 'column';

    if (parentNode) {
      const display = parentNode.style.display;

      if (display == 'flex') {
        const flexDirection = parentNode.style.flexDirection;

        if (!flexDirection.includes('column') || flexDirection == '') {
          direction = 'row';
        }
      }
    }

    return direction;
  }

  totalItems() {

  }

}

export const dragdropHelper = new DragDropHelper();
