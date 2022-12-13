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
    case 'MOVE_ITEM': {
      const found = dragdropHelper.find(payload);

      if (!found) {
        return state;
      }

      const { dragIndex, dropIndex, dragCounts } = found;

      const dragItems: any = [];

      // update map parentId and placeholderId dragItem
      state.data[dragIndex].parentId = found.parentId;
      state.data[dragIndex].placeholderId = found.placeholderId;

      for (let i = 0; i < dragCounts; i++) {
        dragItems.push(state.data[dragIndex + i]);
      }

      return update(state, {
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
    }
    case 'ADD_ITEM': {
      const { context, ...item } = payload;
      const found = dragdropHelper.find(payload);

      if (!found) {
        return state;
      }

      let { dropIndex, dropType } = found;

      if (dropType === 'dropzone') {
        dropIndex = 1;
      }

      const dragItem = {
        ...item,
        id: payload.id || randomString(),
        parentId: found.parentId,
        placeholderId: found.placeholderId,
      };

      return update(state, {
        data: {
          $splice: [[dropIndex, 0, dragItem]],
          $apply: (data) =>
            data.filter((item, index) => {
              item.position = index;
              return item;
            }),
        },
      });
    }
    case 'DELETE_ITEM': {
      const [counts] = dragdropHelper.count(payload);

      return update(state, {
        data: {
          $splice: [[payload.position, counts]],
          $apply: (data) =>
            data.filter((item, index) => {
              item.position = index;
              return item;
            }),
        },
      });
    }
    case 'DUPLICATE_ITEM': {
      const [counts] = dragdropHelper.count(payload);

      let duplicateIds: any = {};
      const duplicateItems: any = [];

      for (let i = 0; i < counts; i++) {
        const item = state.data[payload.position + i];
        const newId = randomString();
        duplicateIds = { ...duplicateIds, [item.id]: newId };

        duplicateItems.push({
          ...item,
          id: newId,
          parentId: duplicateIds[item.parentId] || item.parentId,
        });
      }

      const lastCount = duplicateItems.length - 1;
      const lastItem = duplicateItems[lastCount];
      const lastIndex = parseInt(lastItem.position) + 1;

      return update(state, {
        data: {
          $splice: [[lastIndex, 0, ...duplicateItems]],
          $apply: (data) =>
            data.filter((item, index) => {
              item.position = index;
              return item;
            }),
        },
      });
    }
    case 'UPDATE_ITEM': {
      //console.log('UPDATE ITEM', payload);
      return update(state, {
        data: {
          $apply: (data) =>
            data.map((item, index) => {
              if (item.id !== payload.id) return item;

              return {
                ...item,
                ...payload
              }
            }),
        },
      });
    }
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
