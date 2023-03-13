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

describe('addItems', () => {
  const data = [
    { id: 1, dataType:'block', data: [], parentId: null, childId: null, position: 0 },
    { id: 2, dataType:'block', data: [], parentId: null, childId: null, position: 1 },
    { id: 3, dataType:'block', data: [], parentId: null, childId: null, position: 2 },
  ];
  const dragItem = { id: 4, dataType:'field', data: [], parentId: null, childId: null, position: -1 };
  const dropRefTop = {...data[1], offset: 'top'};
  const dropRefMiddle = {...data[1], offset: 'middle'};
  const dropRefBottom = {...data[1], offset: 'bottom'};
  
    it('adds the dragged item to the correct position Top with updated parent and child IDs', () => {
      const result = dndHelper.addItems(dragItem, dropRefTop, data);
      //console.log('Top', result);
      expect(result).toHaveLength(4);
      expect(result[0]).toEqual({ id: 1, dataType:'block', data: [], parentId: null, childId: null, position: 0 });
      expect(result[1]).toEqual({ id: 4, dataType:'field', data: [], parentId: null, childId: null, position: 1 });
      expect(result[2]).toEqual({ id: 2, dataType:'block', data: [], parentId: null, childId: null, position: 2 });
      expect(result[3]).toEqual({ id: 3, dataType:'block', data: [], parentId: null, childId: null, position: 3 });
    });

    it('adds the dragged item to the correct position Middle with updated parent and child IDs', () => {
      const result = dndHelper.addItems(dragItem, dropRefMiddle, data);
      //console.log('Middle', result);
      expect(result).toHaveLength(4);
      expect(result[0]).toEqual({ id: 1, dataType:'block', data: [], parentId: null, childId: null, position: 0 });
      expect(result[1]).toEqual({ id: 2, dataType:'block', data: [], parentId: null, childId: null, position: 1 });
      expect(result[2]).toEqual({ id: 4, dataType:'field', data: [], parentId: '2', childId: null, position: 2 });
      expect(result[3]).toEqual({ id: 3, dataType:'block', data: [], parentId: null, childId: null, position: 3 });
    });

    it('adds the dragged item to the correct position Bottom with updated parent and child IDs', () => {
      const result = dndHelper.addItems(dragItem, dropRefBottom, data);
      //console.log('Bottom', result);
      expect(result).toHaveLength(4);
      expect(result[0]).toEqual({ id: 1, dataType:'block', data: [], parentId: null, childId: null, position: 0 });
      expect(result[1]).toEqual({ id: 2, dataType:'block', data: [], parentId: null, childId: null, position: 1 });
      expect(result[2]).toEqual({ id: 4, dataType:'field', data: [], parentId: null, childId: null, position: 2 });
      expect(result[3]).toEqual({ id: 3, dataType:'block', data: [], parentId: null, childId: null, position: 3 });
    });
  
    it('returns the original data if the drop index could not be calculated', () => {
      const result = dndHelper.addItems(dragItem, { id: 99, dataType:'block', data: [], parentId: null, childId: null, position: 99 }, data);
      expect(result).toBe(data);
    });
});

describe('calculateDropIndex function', () => {
  const dragItem: Item = { 
    id: '2',
    dataType: 'field',
    data: [],
    position: 1,
    parentId: null,
    childId: null 
  };
  
  const dropRef: Item = {
    id: '1',
    dataType: 'block',
    data: [],
    position: 0,
    parentId: null,
    childId: null,
    offset: ''
  };

  it('returns the correct drop index for a field-to-block drop where the drag item is dropped above the drop item', () => {
    dropRef.offset = 'top';
    const result = dndHelper.calculateDropIndex(dragItem, dropRef);
    expect(result?.dropIndex).toBe(0);
  });

  it('returns the correct drop index for a field-to-block drop where the drag item is dropped below the drop item', () => {
    dropRef.offset = 'bottom';
    const result = dndHelper.calculateDropIndex(dragItem, dropRef);
    expect(result?.dropIndex).toBe(1);
  });

  it('returns the correct drop index for a field-to-block drop where the drag item is dropped in the middle of the drop item', () => {
    dropRef.offset = 'middle';
    const result = dndHelper.calculateDropIndex(dragItem, dropRef);
    expect(result?.dropIndex).toBe(1);
  });

  it('returns null if the drag item is dropped onto a nested child of the drop item', () => {
    dragItem.id = '1';
    dragItem.dataType = 'block';
    dragItem.data.push({ id: '2', dataType: 'field', data: [], position: 1, parentId: '1', childId: null });
    dropRef.id = '2';
    dropRef.offset = 'top';
    const result = dndHelper.calculateDropIndex(dragItem, dropRef);
    console.log('NULL', result);
    expect(result).toBeNull();
  });
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

