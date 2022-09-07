import update from 'immutability-helper';
import { DragDropAction, DragDropState } from "./dragdrop.type";

export const initialState = {
  data: []
}

export const reducer = (state: DragDropState, { type, payload }: DragDropAction) => {
  switch (type) {
    case 'INIT':
      return { ...state, data: [...payload] };
    case 'MOVE_ITEM':
      let {
        position: dragIndex,
        role: dragType,
        parentId: dragParentId
      } = payload;

      let {
        id: dropId,
        position: dropIndex,
        role: dropType,
        parentId: dropParentId
      } = payload.drop.item;

      const dragItem = state.data[dragIndex];

      if (payload.drop.offset == 'center') {
        dragItem.parentId = dropId;
      } else {
        dragItem.parentId = dropParentId;
      }

      if (dragType === 'field' && dropType === 'field') {

        return update(state, {
          data: {
            $splice: [
              [dragIndex, 1],
              [dropIndex, 0, dragItem as any]
            ],
            $apply: data => data.filter((item, index) => {
              item.position = index;
              return item;
            })
          }
        });
      } else if (dragType === 'field' && dropType === 'block') {

        return update(state, {
          data: {
            $splice: [
              [dragIndex, 1],
              [dropIndex + 1, 0, dragItem as any]
            ],
            $apply: data => data.filter((item, index) => {
              item.position = index;
              return item;
            })
          }
        });
      } else {
        return state;
      }

    default:
      return state;
  }
}