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
        parentId: dragParentId,
        position: dragPosition
      } = payload;

      if (!payload.drop.item) {
        return state;
      }

      let {
        id: dropId,
        position: dropIndex,
        role: dropType,
        parentId: dropParentId,
        position: dropPosition
      } = payload.drop.item;

      const dragItem = state.data[dragIndex];
      const offset = payload.drop.offset;

      // check
      if ((dropPosition - dragPosition == 1 && (offset == 'top' || offset == 'left')) || (dropPosition - dragPosition == -1 && (offset == 'bottom' || offset == 'right'))) {
        return state;
      }

      if (dragType === 'field' && dropType === 'field') {

        // map to parentId
        dragItem.parentId = dropParentId;

        const nested = update(state, {
          data: arr => arr.filter(i => (i.position >= 2 && i.position <= 4))
        });

        console.log('ITEMS', nested);

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
      } else if (dragType === 'block' && dropType === 'block') {

      } else if (dragType === 'block' && dropType === 'field') {

      } else {
        return state;
      }

    default:
      return state;
  }
}

/*

// Delete a value (7) if found, all occurrences
update(state, {
  items: arr => arr.filter(item => item != 7),
})

// Delete a value (7) if found, first occurrence only
const index = state.items.indexOf(7);
if (index >= 0) {
  update(state, { items: { $splice: [[index, 1]] } });
}

// Delete at a specific index, no matter what value is in it
update(state, { items: { $splice: [[index, 1]] } });

*/