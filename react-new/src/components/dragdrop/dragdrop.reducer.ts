import update from 'immutability-helper';
import { dragdropHelper } from '../../helpers';
import { DragDropAction, DragDropState } from './dragdrop.type';

export const initialState = {
  data: [],
};

export const reducer = (state: DragDropState, { type, payload }: DragDropAction) => {
  switch (type) {
    case 'INIT':
      return { ...state, data: [...payload] };
    case 'MOVE_ITEM':
      let {
        id: dragId,
        position: dragIndex,
        role: dragType,
        parentId: dragParentId,
        position: dragPosition,
      } = payload;

      if (!payload.drop.item) {
        return state;
      }

      let {
        id: dropId,
        position: dropIndex,
        role: dropType,
        parentId: dropParentId,
        position: dropPosition,
      } = payload.drop.item;

      const offset = payload.drop.offset;

      // get dragItems count
      const [dragCounts, dragIds] = dragdropHelper.totalCount(payload);

      // get dropItems count
      const [dropCounts, dropIds] = dragdropHelper.totalCount(payload.drop.item);

      const fromTop = dragPosition < dropPosition;
      const fromBottom = dragPosition > dropPosition;
      const overTop = offset == 'top' || offset == 'left';
      const overBottom = offset == 'bottom' || offset == 'right';

      const dragItem = state.data[dragIndex];
      dragItem.parentId = offset == 'middle' ? dropId : dropParentId;

      let dragItems: any = [];

      console.log('dragIds', dragIds);
      console.log('dropIds', dropIds);

      if (dragType === 'field' && dropType === 'field') {
        if (fromTop && overTop) {
          dropIndex = dropIndex - 1;
          console.log(`${dragType}to${dropType} (drag-from-top and drop-over-top)`);
        } else if (fromBottom && overBottom) {
          dropIndex = dropIndex + 1;
          console.log(`${dragType}to${dropType} (drag-from-bottom and drop-over-bottom)`);
        }
      } else {
        if (fromTop && overTop) {
          dropIndex = dropIndex - dragCounts;
          console.log(`${dragType}to${dropType} (drag-from-top and drop-over-top)`);
        } else if (fromTop && overBottom) {
          dropIndex = dropIndex + dropCounts - dragCounts;
          console.log(`${dragType}to${dropType} (drag-from-top and drop-over-bottom)`);
        } else if (fromBottom && overBottom) {
          // check drag is in drop parent 
          if (dropIds.includes(dragId)) {
            dropIndex = dropIndex + dropCounts - dragCounts;
          } else {
            dropIndex = dropIndex + dropCounts;
          }
          console.log(`${dragType}to${dropType} (drag-from-bottom and drop-over-bottom)`);
        } else if (fromBottom && overTop) {
          if (dropIds.includes(dragId)) {
            dropIndex = dropIndex - 1;
          }
          console.log(`${dragType}to${dropType} (drag-from-bottom and drop-over-top)`);
        } else if (fromTop && offset == 'middle') {
          console.log(`${dragType}to${dropType} (drag-from-top and drop-over-middle)`);
        } else if (fromBottom && offset == 'middle') {
          dropIndex = dropIndex + 1;
          console.log(`${dragType}to${dropType} (drag-from-bottom and drop-over-middle)`);
        } else {
          return state;
        }
      }

      //blocktofield (drag-from-bottom and drop-over-top) bug

      for (let i = 0; i < dragCounts; i++) {
        dragItems = [...dragItems, state.data[dragIndex + i]];
      }

      const nextState = update(state, {
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

      console.log('NEXT STATE', nextState);

      return nextState;


    /*
    if (dragType === 'field' && dropType === 'field') {
      const dragItem = state.data[dragIndex];

      // map to parentId
      dragItem.parentId = dropParentId;

      if (dragPosition < dropPosition && (offset == 'top' || offset == 'left')) {
        dropIndex = dropIndex - 1;
        console.log('FIELD TOP');
      } else if (dragPosition > dropPosition && (offset == 'bottom' || offset == 'right')) {
        dropIndex = dropIndex + 1;
        console.log('FIELD BOTTOM');
      }

      const nextState = update(state, {
        data: {
          $splice: [
            [dragIndex, 1],
            [dropIndex, 0, dragItem as any],
          ],
          $apply: (data) =>
            data.filter((item, index) => {
              item.position = index;
              return item;
            }),
        },
      });

      console.log(nextState);

      return nextState;
    } else if (dragType === 'field' && dropType === 'block') {
      const dragItem = state.data[dragIndex];

      // map to parentId
      dragItem.parentId = dropParentId;

      if (dragPosition < dropPosition && (offset == 'top' || offset == 'left')) {
        dropIndex = dropIndex - dragCounts;
        console.log('TOP', dropIndex);
      } else if (dragPosition < dropPosition && (offset == 'bottom' || offset == 'right')) {
        dropIndex = dropIndex + dropCounts - dragCounts;
        console.log('TOP BOTTOM', dropIndex);
      } else if (dragPosition > dropPosition && (offset == 'bottom' || offset == 'right')) {
        dropIndex = dropIndex + dropCounts - dragCounts;
        console.log('BOTTOM', dropIndex);
      } else if (dragPosition > dropPosition && (offset == 'top' || offset == 'left')) {
        // dropIndex = dropIndex - dragCounts + dropCounts;
        console.log('BOTTOM TOP', dropIndex);
      } else if (dragPosition < dropPosition && offset == 'middle') {
        dragItem.parentId = dropId;
        console.log('MIDDLE TOP', dropIndex);
      } else if (dragPosition > dropPosition && offset == 'middle') {
        dragItem.parentId = dropId;
        dropIndex = dropIndex + 1;
        console.log('MIDDLE BOTTOM', dropIndex);
      }

      const nextState = update(state, {
        data: {
          $splice: [
            [dragIndex, 1],
            [dropIndex, 0, dragItem],
          ],
          $apply: (data) =>
            data.filter((item, index) => {
              item.position = index;
              return item;
            }),
        },
      });

      console.log(nextState);

      return nextState;
    } else if (dragType === 'block' && dropType === 'block') {
      const fromTop = dragPosition < dropPosition;
      const fromBottom = dragPosition > dropPosition;
      const overTop = offset == 'top' || offset == 'left';
      const overBottom = offset == 'bottom' || offset == 'right';

      const dragItem = state.data[dragIndex];
      dragItem.parentId = offset == 'middle' ? dropId : dropParentId;

      let dragItems: any = [];

      if (fromTop && overTop) {
        dropIndex = dropIndex - dragCounts;
        console.log('drag-from-top and drop-over-top');
      } else if (fromTop && overBottom) {
        dropIndex = dropIndex + dropCounts - dragCounts;
        console.log('drag-from-top and drop-over-bottom');
      } else if (fromBottom && overBottom) {
        dropIndex = dropIndex + dropCounts - dragCounts;
        console.log('drag-from-bottom and drop-over-bottom');
      } else if (fromBottom && overTop) {
        console.log('drag-from-bottom and drop-over-top');
      } else if (fromTop && offset == 'middle') {
        console.log('drag-from-top and drop-over-middle', dropIndex);
      } else if (fromBottom && offset == 'middle') {
        dropIndex = dropIndex + 1;
        console.log('drag-from-bottom and drop-over-middle', dropIndex);
      }

      for (let i = 0; i < dragCounts; i++) {
        dragItems = [...dragItems, state.data[dragIndex + i]];
      }

      const nextState = update(state, {
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

      console.log('NEXT STATE', nextState);

      return nextState;

    } else if (dragType === 'block' && dropType === 'field') {
      const dragItem = state.data[dragIndex];
      let dragItems: any = [];

      // map to parentId
      dragItem.parentId = dropParentId;

      if (dragPosition < dropPosition && (offset == 'top' || offset == 'left')) {
        dropIndex = dropIndex - dragCounts;
        console.log('TOP');
      } else if (dragPosition < dropPosition && (offset == 'bottom' || offset == 'right')) {
        dropIndex = dropIndex + dropCounts - dragCounts;
        console.log('TOP BOTTOM', dropIndex);
      } else if (dragPosition > dropPosition && (offset == 'bottom' || offset == 'right')) {
        dropIndex = dropIndex + 1;
        console.log('BOTTOM');
      } else if (dragPosition > dropPosition && (offset == 'top' || offset == 'left')) {
        // dropIndex = dropIndex - dragCounts + dropCounts;
        console.log('BOTTOM TOP', dropIndex);
      }

      for (let i = 0; i < dragCounts; i++) {
        dragItems = [...dragItems, state.data[dragIndex + i]];
      }

      const nextState = update(state, {
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

      return nextState;
    } else {
      return state;
    }
    */

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
