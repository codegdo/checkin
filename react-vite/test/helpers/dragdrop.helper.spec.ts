import { describe, expect, test } from 'vitest';
import { dndHelper } from '../../src/helpers';

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
      console.log('Top', result);
      expect(result).toHaveLength(4);
      expect(result[0]).toEqual({ id: 1, dataType:'block', data: [], parentId: null, childId: null, position: 0 });
      expect(result[1]).toEqual({ id: 4, dataType:'field', data: [], parentId: null, childId: null, position: 1 });
      expect(result[2]).toEqual({ id: 2, dataType:'block', data: [], parentId: null, childId: null, position: 2 });
      expect(result[3]).toEqual({ id: 3, dataType:'block', data: [], parentId: null, childId: null, position: 3 });
    });

    it('adds the dragged item to the correct position Middle with updated parent and child IDs', () => {
      const result = dndHelper.addItems(dragItem, dropRefMiddle, data);
      console.log('Middle', result);
      expect(result).toHaveLength(4);
      expect(result[0]).toEqual({ id: 1, dataType:'block', data: [], parentId: null, childId: null, position: 0 });
      expect(result[1]).toEqual({ id: 2, dataType:'block', data: [], parentId: null, childId: null, position: 1 });
      expect(result[2]).toEqual({ id: 4, dataType:'field', data: [], parentId: '2', childId: null, position: 2 });
      expect(result[3]).toEqual({ id: 3, dataType:'block', data: [], parentId: null, childId: null, position: 3 });
    });

    it('adds the dragged item to the correct position Bottom with updated parent and child IDs', () => {
      const result = dndHelper.addItems(dragItem, dropRefBottom, data);
      console.log('Bottom', result);
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