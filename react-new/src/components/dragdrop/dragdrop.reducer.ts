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
      const dragCounts = dragdropHelper.totalCount(payload) + 1;

      // get dropItems count
      const dropCounts = dragdropHelper.totalCount(payload.drop.item) + 1;

      console.log('dragItem', payload);
      console.log('dragCounts', dragCounts);
      console.log('dropCounts', dropCounts);

      // if (
      //   (dragPosition < dropPosition &&
      //     dropPosition - dragCounts == dragPosition &&
      //     (offset == 'top' || offset == 'left')) ||
      //   (dragPosition > dropPosition &&
      //     dragPosition - dropCounts == dropPosition &&
      //     (offset == 'bottom' || offset == 'right'))
      // ) {
      //   console.log('EXIT');
      //   return state;
      // }

      /* check
      if ((dropPosition - dragPosition == 1 && (offset == 'top' || offset == 'left')) || (dropPosition - dragPosition == -1 && (offset == 'bottom' || offset == 'right'))) {
        console.log('CHEKC');
        //return state;
      }*/

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
        const dragItem = state.data[dragIndex];
        let dragItems: any = [];

        // map to parentId
        dragItem.parentId = dropParentId;

        // get dragItems count
        //const dragCounts = dragdropHelper.totalCount(payload);

        // get dropItems count
        //const dropCounts = dragdropHelper.totalCount(payload.drop.item);
        //

        //console.log('dragCount', dragCounts);
        //console.log('dropCount', dropCounts);

        /*
        if (
          dragPosition < dropPosition &&
          dropPosition - dragCounts == 0 &&
          (offset == 'top' || offset == 'left')
        ) {
          dropIndex = dragIndex;
          console.log('FIRST', dropIndex);
        } else if (
          dragPosition > dropPosition &&
          dragPosition - dropCounts == 0 &&
          (offset == 'bottom' || offset == 'right')
        ) {
          dropIndex = dropIndex + dropCounts;
          console.log('LAST', dropIndex);
        } else if (dragPosition < dropPosition && (offset == 'top' || offset == 'left')) {
          dropIndex = dropIndex - 1;
          console.log('TOP', dropIndex);
        } else if (dragPosition > dropPosition && (offset == 'bottom' || offset == 'right')) {
          dropIndex = dropIndex + dropCounts;
          console.log('BOTTOM', dropIndex);
        } else if (offset == 'middle') {
          dragItem.parentId = dropId;
          dropIndex = dropIndex + 1;
        }
       

        if (dragPosition < dropPosition && (offset == 'top' || offset == 'left')) {
          dropIndex = dropIndex - dragCounts;
          console.log('TOP', dropIndex);
        } else if (dragPosition > dropPosition && (offset == 'bottom' || offset == 'right')) {
          dropIndex = dropIndex + dropCounts;
          console.log('BOTTOM', dropIndex);
        } else if (offset == 'middle') {
          dragItem.parentId = dropId;
          dropIndex = dropIndex + 1;
        } 

        if (
          dragPosition < dropPosition &&
          dropPosition - dragCounts == 0 &&
          (offset == 'top' || offset == 'left')
        ) {
          //dropIndex = dragIndex;
          return state;
        } else if (
          dragPosition > dropPosition &&
          dragPosition - dropCounts == 0 &&
          (offset == 'bottom' || offset == 'right')
        ) {
          //dropIndex = dropIndex + dropCounts - 1;
          return state;
        } else if (offset == 'bottom' || offset == 'right') {
          dropIndex = dropIndex + dropCounts - 2;
        }

        if (offset == 'bottom' || offset == 'right') {
          dropIndex = dropIndex + dropCounts - 2;
        }*/

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

        // const index = state.data.filter(parent => parent.parentId == dropParentId).find(x => x.id == dropId);
        // const nested = update(state, {
        //   data: arr => arr.filter(i => (i.position >= dragPosition && i.position <= dropPosition - 1))
        // });

        // console.log('ITEMS', dragItems);

        // return state;
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
