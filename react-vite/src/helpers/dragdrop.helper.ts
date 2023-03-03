class DragDropHelper {
  hoverOffsetX(
    clientX: number,
    middleX: number,
    targetWidth: number
  ): 'left' | 'right' | 'middle' {
    return clientX <= middleX - targetWidth
      ? 'left'
      : clientX >= middleX + targetWidth
      ? 'right'
      : 'middle';
  }

  hoverOffsetY(
    clientY: number,
    middleY: number,
    elementHeight: number
  ): 'top' | 'bottom' | 'middle' {
    return clientY <= middleY - elementHeight
      ? 'top'
      : clientY >= middleY + elementHeight
      ? 'bottom'
      : 'middle';
  }

  getElementDisplay(element: HTMLElement): string {
    const parentNode = element.parentNode as HTMLElement;

    if (!parentNode) {
      return 'column';
    }

    const computedParentStyle = window.getComputedStyle(parentNode);
    const parentDisplayStyle =
      parentNode.style.display || computedParentStyle.display;
    const parentFlexDirection =
      parentNode.style.flexDirection || computedParentStyle.flexDirection;

    if (parentDisplayStyle !== 'flex') {
      return 'column';
    }

    if (!parentFlexDirection.includes('column') || parentFlexDirection === '') {
      return 'row';
    }

    return 'column';
  }

  getElementSize(element: HTMLElement): {
    elementWidth: number;
    elementHeight: number;
  } {
    let elementWidth = 0;
    let elementHeight = 0;

    if (element.classList.contains('-empty')) {
      const style = window.getComputedStyle(element, ':after');
      elementWidth = (parseFloat(style.width) || 0) / 2;
      elementHeight = (parseFloat(style.height) || 0) / 2;
    }

    return { elementWidth, elementHeight };
  }
}

export const dndHelper = new DragDropHelper();
export default DragDropHelper;
