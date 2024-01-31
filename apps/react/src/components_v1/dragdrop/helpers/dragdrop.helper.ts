import utils, { Utils } from '@/utils';

import { DndField } from "../types";
import { DropTargetMonitor } from 'react-dnd';
import { DndRef } from '../hooks';

class DndHelper {
  private utils: Utils;

  constructor(utils: Utils) {
    this.utils = utils;
  }

  groupData(data: DndField[]) {
    return this.utils.groupDataForRender(data);
  }

  setCoordinate(ref: DndRef, monitor: DropTargetMonitor<DndField>): boolean {
    const clientOffset = monitor.getClientOffset();
    const { coordinate } = ref;

    if (!clientOffset) {
      return true;
    }

    const { x: currentX, y: currentY } = coordinate;
    const { x: clientX, y: clientY } = clientOffset;

    if (currentX === clientX && currentY === clientY) {
      return true;
    }

    coordinate.x = clientX;
    coordinate.y = clientY;

    return false;
  }
}

export const dndHelper = new DndHelper(utils);
