import utils, { Utils } from '@/utils';
import { KeyValue } from '../types';

class FormHelper {
  private utils: Utils;

  constructor(utils: Utils) {
    this.utils = utils;
  }

  groupDataForRender() {

  }

  mapKeyValue<T>(fields: T[][], mapKey: (obj: T) => { key: string; value: string }) {
    return this.utils.mapKeyAndValue(fields, mapKey);
  }

  sortAndGroupByObject<T>(inputArray: T[], groupingKey: keyof T) {
    return this.utils.sortAndGroupByObject(inputArray as KeyValue[], groupingKey as keyof KeyValue);
  }

  sortAndGroupByArray<T>(fields: T[], groupingKey: keyof T): T[][] {
    return this.utils.sortAndGroupByArray(fields, groupingKey);
  }

}

export const formHelper = new FormHelper(utils);
