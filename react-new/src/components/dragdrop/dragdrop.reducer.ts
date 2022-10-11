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
      const dragdrop_MOVE = dragdropHelper.findDragDrop(payload);

      if (!dragdrop_MOVE) {
        return state;
      }

      const { dragIndex, dropIndex, dragCounts } = dragdrop_MOVE;

      const dragItems: any = [];

      // update map parentId and placeholderId dragItem
      state.data[dragIndex].parentId = dragdrop_MOVE.parentId;
      state.data[dragIndex].holderId = dragdrop_MOVE.holderId;

      for (let i = 0; i < dragCounts; i++) {
        dragItems.push(state.data[dragIndex + i]);
      }

      const state_MOVE = update(state, {
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

      console.log('NEXT STATE', state_MOVE);

      return state_MOVE;
    case 'ADD_ITEM':
      const dragdrop_ADD = dragdropHelper.findDragDrop(payload);

      if (!dragdrop_ADD) {
        return state;
      }

      let { dropIndex: dropIndex_ADD, dropType } = dragdrop_ADD;

      if (dropType === 'dropzone') {
        dropIndex_ADD = 1;
      }

      const dragItem = {
        id: payload.id || randomString(),
        type: payload.type,
        name: payload.name,
        role: payload.role,
        position: null,
        data: payload.data,
        value: payload.value,
        parentId: dragdrop_ADD.parentId,
        holderId: dragdrop_ADD.holderId,
      };

      const state_ADD = update(state, {
        data: {
          $splice: [[dropIndex_ADD, 0, dragItem]],
          $apply: (data) =>
            data.filter((item, index) => {
              item.position = index;
              return item;
            }),
        },
      });

      console.log('NEXT STATE', state_ADD);

      return state_ADD;
    case 'DELETE_ITEM':
      const [count] = dragdropHelper.totalCount(payload);

      const state_DELETE = update(state, {
        data: {
          $splice: [[payload.position, count]],
          $apply: (data) =>
            data.filter((item, index) => {
              item.position = index;
              return item;
            }),
        },
      });

      console.log('NEXT STATE', state_DELETE);

      return state_DELETE;
    case 'DUPLICATE_ITEM':
      const [duplicateCount] = dragdropHelper.totalCount(payload);

      let duplicateIds: any = {};
      const duplicateItems: any = [];

      for (let i = 0; i < duplicateCount; i++) {
        const item = state.data[payload.position + i];
        const newId = randomString();
        duplicateIds = { ...duplicateIds, [item.id]: newId };

        duplicateItems.push({
          ...item,
          id: newId,
          parentId: duplicateIds[item.parentId] || item.parentId,
        });
      }

      console.log(duplicateItems);

      // state.data.filter((item) => {
      //   if (item.position <= payload.position + duplicateCount - 1 && item.position >= payload.position) {

      //     if (item.parentId == null || item.parentId !== oldId) {
      //       oldId = item.id;
      //       oldParentId = item.parentId;
      //       newId = randomString();
      //     }

      //     //item.id = newId;

      //     // map children
      //     if (item.parentId == oldId) {
      //       oldParentId = newId;
      //       newId = randomString();
      //     }

      //     duplicateItems.push({ ...item, id: newId, parentId: oldParentId });
      //   }
      // });

      //console.log(duplicateItems);

      const state_DUPLICATE = update(state, {
        data: {
          $splice: [[payload.position, 0, ...duplicateItems]],
          $apply: (data) =>
            data.filter((item, index) => {
              item.position = index;
              return item;
            }),
        },
      });

      console.log('NEXT STATE', state_DUPLICATE);

      return state_DUPLICATE;

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
