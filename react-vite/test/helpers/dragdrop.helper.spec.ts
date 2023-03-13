import { Component } from 'react';
import { describe, expect, test } from 'vitest';
import { dndHelper } from '../../src/helpers';

interface Item {
  id: string,
  dataType: string,
  data: any[],
  position: number,
  parentId: string | null,
  childId: string | null,
  offset?: string
}

describe('addItems function', () => {
  const data = [
    { id: 1, dataType: 'block', data: [], parentId: null, childId: null, position: 0 },
    { id: 2, dataType: 'block', data: [], parentId: null, childId: null, position: 1 },
    { id: 3, dataType: 'block', data: [], parentId: null, childId: null, position: 2 },
  ];
  const dragItem = { id: 4, dataType: 'field', data: [], parentId: null, childId: null, position: -1 };
  const dropRefTop = { ...data[1], offset: 'top' };
  const dropRefMiddle = { ...data[1], offset: 'middle' };
  const dropRefBottom = { ...data[1], offset: 'bottom' };

  it('adds the dragged item to the correct position Top with updated parent and child IDs', () => {
    const result = dndHelper.addItems(dragItem, dropRefTop, data);
    //console.log('Top', result);
    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({ id: 1, dataType: 'block', data: [], parentId: null, childId: null, position: 0 });
    expect(result[1]).toEqual({ id: 4, dataType: 'field', data: [], parentId: null, childId: null, position: 1 });
    expect(result[2]).toEqual({ id: 2, dataType: 'block', data: [], parentId: null, childId: null, position: 2 });
    expect(result[3]).toEqual({ id: 3, dataType: 'block', data: [], parentId: null, childId: null, position: 3 });
  });

  it('adds the dragged item to the correct position Middle with updated parent and child IDs', () => {
    const result = dndHelper.addItems(dragItem, dropRefMiddle, data);
    //console.log('Middle', result);
    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({ id: 1, dataType: 'block', data: [], parentId: null, childId: null, position: 0 });
    expect(result[1]).toEqual({ id: 2, dataType: 'block', data: [], parentId: null, childId: null, position: 1 });
    expect(result[2]).toEqual({ id: 4, dataType: 'field', data: [], parentId: '2', childId: null, position: 2 });
    expect(result[3]).toEqual({ id: 3, dataType: 'block', data: [], parentId: null, childId: null, position: 3 });
  });

  it('adds the dragged item to the correct position Bottom with updated parent and child IDs', () => {
    const result = dndHelper.addItems(dragItem, dropRefBottom, data);
    //console.log('Bottom', result);
    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({ id: 1, dataType: 'block', data: [], parentId: null, childId: null, position: 0 });
    expect(result[1]).toEqual({ id: 2, dataType: 'block', data: [], parentId: null, childId: null, position: 1 });
    expect(result[2]).toEqual({ id: 4, dataType: 'field', data: [], parentId: null, childId: null, position: 2 });
    expect(result[3]).toEqual({ id: 3, dataType: 'block', data: [], parentId: null, childId: null, position: 3 });
  });

  it('returns the original data if the drop index could not be calculated', () => {
    const result = dndHelper.addItems(dragItem, { id: 99, dataType: 'block', data: [], parentId: null, childId: null, position: 99 }, data);
    expect(result).toBe(data);
  });
});

describe('calculateDropIndex function', () => {

  it('default offset to "bottom" when dropOffset is falsy', () => {
    const dragItem: Item = { id: '2', dataType: 'field', data: [], position: 1, parentId: null, childId: null }
    const dropRef: Item = { id: '1', dataType: 'field', data: [], position: 2, parentId: null, childId: null, offset: undefined }
    const result = dndHelper.calculateDropIndex(dragItem, dropRef);
    expect(result?.dropIndex).toBe(3);
  });

  it('returns null if the drag item is dropped onto a nested child of the drop item', () => {
    const dragItem: Item = { id: '1', dataType: 'block', data: [{ id: '2', dataType: 'field', data: [], position: 1, parentId: '2', childId: null }], position: 1, parentId: null, childId: null }
    const dropRef: Item = { id: '2', dataType: 'field', data: [], position: 2, parentId: '1', childId: null, offset: 'top' }
    const result = dndHelper.calculateDropIndex(dragItem, dropRef);
    expect(result).toBeNull();
  });

  // case field-to-field
  it('returns the correct drop index for a field-to-field drop where the drag item is dropped above the drop item', () => {
    const dragItem: Item = { id: '2', dataType: 'field', data: [], position: 2, parentId: null, childId: null }
    const dropRef: Item = { id: '1', dataType: 'field', data: [], position: 1, parentId: null, childId: null, offset: 'top' }
    const result = dndHelper.calculateDropIndex(dragItem, dropRef);
    expect(result?.dropIndex).toBe(1);
  });

  it('returns the correct drop index for a field-to-field drop where the drag item is dropped below the drop item', () => {
    const dragItem: Item = { id: '2', dataType: 'field', data: [], position: 1, parentId: null, childId: null }
    const dropRef: Item = { id: '1', dataType: 'field', data: [], position: 2, parentId: null, childId: null, offset: 'bottom' }
    const result = dndHelper.calculateDropIndex(dragItem, dropRef);
    expect(result?.dropIndex).toBe(3);
  });

  it('returns the correct drop index for a field-to-field drop where the drag item is dropped left the drop item', () => {
    const dragItem: Item = { id: '2', dataType: 'field', data: [], position: 2, parentId: null, childId: null }
    const dropRef: Item = { id: '1', dataType: 'field', data: [], position: 1, parentId: null, childId: null, offset: 'left' }
    const result = dndHelper.calculateDropIndex(dragItem, dropRef);
    expect(result?.dropIndex).toBe(1);
  });

  it('returns the correct drop index for a field-to-field drop where the drag item is dropped right the drop item', () => {
    const dragItem: Item = { id: '2', dataType: 'field', data: [], position: 1, parentId: null, childId: null }
    const dropRef: Item = { id: '1', dataType: 'field', data: [], position: 2, parentId: null, childId: null, offset: 'right' }
    const result = dndHelper.calculateDropIndex(dragItem, dropRef);
    expect(result?.dropIndex).toBe(3);
  });

  // case placeholder
  /* it('should update dropIndex correctly when dragging from top and over middle', () => {
    const dragItem = {
      id: 'dragItem1',
      dataType: 'field',
      position: 1,
    };
    const dropRef = {
      id: 'dropItem1',
      dataType: 'placeholder',
      position: 1,
      parentId: 'parent1',
      childId: 'child1',
      offset: 'bottom',
    };

    const dragPosition = 1;
    const dropPosition = 1;
    const dropCounts = 4;
    const countItemsSpy = jest.spyOn(Component.prototype, 'countItems').mockImplementation(() => [1, ['dropItem1']]);

    const component = new Component();
    const result = component.calculateDropIndex(dragItem, dropRef);

    expect(countItemsSpy).toHaveBeenCalledTimes(2);
    expect(countItemsSpy).toHaveBeenCalledWith(dragItem);
    expect(countItemsSpy).toHaveBeenCalledWith(dropRef);
    expect(result).toEqual({
      dragId: 'dragItem1',
      dragIds: ['dragItem1'],
      dragDataType: 'field',
      dragIndex: 1,
      dragCounts: 1,
      dropId: 'dropItem1',
      dropIds: ['dropItem1'],
      dropDataType: 'placeholder',
      dropIndex: 4,
      dropCounts: 4,
      dropParentId: 'parent1',
      dropChildId: 'child1',
      dropOffset: 'bottom',
    });

    countItemsSpy.mockRestore();
  }); 
  
  test('isDraggingFromBottomOverMiddle returns true when dragging from bottom and over middle', () => {
  const dragItem = {
    id: 'drag-item-1',
    dataType: 'field',
    position: 2,
  };
  const dropRef = {
    id: 'drop-item-1',
    dataType: 'placeholder',
    position: 3,
    parentId: 'parent-item-1',
    childId: 'child-item-1',
    offset: 'middle',
  };
  const dropCounts = 5;
  const result = calculateDropIndex(dragItem, dropRef, dropCounts);
  expect(result.isDraggingFromBottomOverMiddle).toBe(true);
});

test('dropIndex is set to dropPosition + 1 when not dragging from top or bottom', () => {
  const dragItem = {
    id: 'drag-item-1',
    dataType: 'field',
    position: 2,
  };
  const dropRef = {
    id: 'drop-item-1',
    dataType: 'placeholder',
    position: 3,
    parentId: 'parent-item-1',
    childId: 'child-item-1',
    offset: 'middle',
  };
  const dropCounts = 5;
  const result = calculateDropIndex(dragItem, dropRef, dropCounts);
  expect(result.dropIndex).toBe(dropRef.position + 1);
});
  */

  /* 
    it('returns the correct drop index for a field-to-area drop where the drag item is dropped above the area', () => {
      dropRef.dataType = 'area';
      dropRef.offset = 'top';
      const dropIndex = dndHelper.calculateDropIndex(dragItem, dropRef);
      expect(dropIndex).toBeNull();
    });
  
    it('returns the correct drop index for a field-to-area drop where the drag item is dropped in the middle of the area', () => {
      dropRef.dataType = 'area';
      dropRef.offset = 'middle';
      const dropIndex = dndHelper.calculateDropIndex(dragItem, dropRef);
      expect(dropIndex).toBeNull();
    });
  
    it('returns the correct drop index for a field-to-area drop where the drag item is dropped below the area', () => {
      dropRef.dataType = 'area';
      dropRef.offset = 'bottom';
      const dropIndex = dndHelper.calculateDropIndex(dragItem, dropRef);
      expect(dropIndex).toBeNull();
    });
  
    it('returns the correct drop index for a field-to-placeholder drop where the drag item is dropped above the placeholder', () => {
      dropRef.dataType = 'placeholder';
      dropRef.offset = 'top';
      dropRef.id = '2_placeholder';
      const dropIndex = dndHelper.calculateDropIndex(dragItem, dropRef);
      expect(dropIndex).toBe(2);
    });
  
    it('returns the correct drop index for a field-to-placeholder drop where the drag item is dropped in the middle of the placeholder', () => {
      dropRef.dataType = 'placeholder';
      dropRef.offset = 'middle';
      dropRef.id = '2_placeholder';
      const dropIndex = dndHelper.calculateDropIndex(dragItem, dropRef);
      expect(dropIndex).toBe(3);
    });
  
    it('returns the correct drop index for a field-to-placeholder drop where the drag item is dropped below the placeholder', () => {
      dropRef.dataType = 'placeholder';
      dropRef.offset = 'bottom';
      dropRef.id = '2_placeholder';
      //const dropIndex = dndHelper.calculateDropIndex(d
    }); */
});

