import update from 'immutability-helper';
import { dragdropHelper } from '../../helpers';
import { DragDropAction, DragDropState } from './dragdrop.type';

export const initialState = {
  data: []
};

export const reducer = (state: DragDropState, { type, payload }: DragDropAction) => {
  switch (type) {
    case 'INIT':
      return { ...state, data: [...payload] };
    case 'MOVE_ITEM':

      if (!payload.current.drop) {
        return state;
      };

      if (!payload.current.drop.offset) {
        return state;
      }

      const dropId = payload.current.drop.id.toString();
      const { dragIndex, dropIndex, dragCounts, dragIds, parentId } = dragdropHelper.findDragDropIndex(payload);
      const dragItems: any = [];

      // prevent drag block drop over nest children
      if (dragIds.includes(dropId)) {
        return state;
      }

      console.log('AAAA', payload);

      state.data[dragIndex].parentId = parentId;

      for (let i = 0; i < dragCounts; i++) {
        dragItems.push(state.data[dragIndex + i]);
      }

      const moveState = update(state, {
        data: {
          $splice: [
            [dragIndex, dragCounts],
            [dropIndex, 0, ...dragItems],
          ],
          $apply: (data) =>
            data.filter((item, index) => {
              item.position = index;
              return item;
            }),
        },
      });

      console.log('NEXT STATE', moveState);

      return moveState;
    case 'ADD_ITEM':
      if (!payload.current.drop) {
        return state
      };

      const found = dragdropHelper.findDragDropIndex(payload);

      const dragItem = {
        id: payload.id,
        name: payload.name,
        role: payload.role,
        position: null,
        parentId: found.parentId
      };
      const addState = update(state, {
        data: {
          $splice: [[found.dropIndex, 0, dragItem]],
          $apply: (data) =>
            data.filter((item, index) => {
              item.position = index;
              return item;
            }),
        },
      });

      console.log('NEXT STATE', addState);

      return addState;
    case 'DELETE_ITEM':
      return state;
    case 'UPDATE_ITEM':
      return state;
    default:
      return state;
  }
};

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
