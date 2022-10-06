import update from 'immutability-helper';
import { dragdropHelper } from '../../helpers';
import { randomString } from '../../utils';
import { DragDropAction, DragDropState } from './dragdrop.type';

export const initialState = {
  data: [],
};

export const reducer = (state: DragDropState, { type, payload }: DragDropAction) => {
  switch (type) {
    case 'INIT':
      return { ...state, data: [...payload] };
    case 'MOVE_ITEM':
      if (!payload.current.drop) {
        return state;
      }

      if (!payload.current.drop.offset) {
        return state;
      }

      const dropId = payload.current.drop.id.toString();
      const dropType = payload.current.drop.role;
      const { dragIndex, dropIndex, dragCounts, dragIds, parentId, placeholderId, } =
        dragdropHelper.findDragDropIndex(payload);
      const dragItems: any = [];

      // prevent drag block drop over nest children
      if (dragIds.includes(dropId)) {
        return state;
      }

      console.log('AAAA', payload);

      state.data[dragIndex].parentId = (dropType == 'placeholder') ? parentId.split('_')[0] : parentId;
      state.data[dragIndex].placeholderId = placeholderId;

      for (let i = 0; i < dragCounts; i++) {
        dragItems.push(state.data[dragIndex + i]);
      }

      const stateMove = update(state, {
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

      console.log('NEXT STATE', stateMove);

      return stateMove;
    case 'ADD_ITEM':

      if (!payload.current.drop) {
        return state;
      }

      const dragItem = {
        id: payload.id || randomString(),
        type: payload.type,
        name: payload.name,
        role: payload.role,
        position: null,
        data: payload.data,
        value: payload.value,
        parentId: null,
      };

      if (payload.current.drop.id === 'dropholder') {

        return update(state, {
          data: {
            $splice: [[1, 0, dragItem]],
            $apply: (data) =>
              data.filter((item, index) => {
                item.position = index;
                return item;
              }),
          },
        });
      }

      const { parentId: parentId_ADD, dropIndex: dropIndex_ADD } = dragdropHelper.findDragDropIndex(payload);

      dragItem.parentId = parentId_ADD;

      const stateAdd = update(state, {
        data: {
          $splice: [[dropIndex_ADD, 0, dragItem]],
          $apply: (data) =>
            data.filter((item, index) => {
              item.position = index;
              return item;
            }),
        },
      });

      console.log('NEXT STATE', stateAdd);

      return stateAdd;
    case 'DELETE_ITEM':
      const [counts, ids] = dragdropHelper.totalCount(payload);

      const stateDelete = update(state, {
        data: {
          $splice: [[payload.position, counts]],
          $apply: (data) =>
            data.filter((item, index) => {
              item.position = index;
              return item;
            }),
        },
      });

      console.log('NEXT STATE', stateDelete);

      return stateDelete;

      console.log(ids, counts);
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
