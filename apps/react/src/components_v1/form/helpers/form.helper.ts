import * as utils from '@/utils';
import { IUtils } from '@/utils/utils.type';

class FormHelper {
  private utils: IUtils;

  constructor(utils: IUtils) {
    this.utils = utils;
  }

  mapKeyValue<T>(fields: T[][], mapKey: (obj: T) => { key: string; value: string }) {
    return this.utils.mapKeyAndValue(fields, mapKey);
  }

  sortAndGroup<T>(fields: T[], groupingKey: keyof T & (string | number)): T[][] {
    return this.utils.sortAndGroupByKey(fields, groupingKey);
  }

}

export const formHelper = new FormHelper(utils);
