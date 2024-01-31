import { cloneObject } from './clone-object.util';
import { compareObject } from './compare-object.util';
import { countItems } from './count-items.util';
import { mapToParent } from './map-to-parent.util';
import { randomString } from './random-string.util';
import { classNames } from './classnames.util';
import { filterArrayRange } from './fitered-array-range.util';
import { filterArrayRangeExclusingStart } from './filtered-array-range-exclusing-start.util';
import { stringifyUrl } from './stringify-url.util';
import { encrypt, decrypt } from './encryption.util';
import { groupDataForRender } from './group-data-for-render.util';
import { saveToSessionStorage, setSessionStorage } from './session-storage.util';
import { findItemById } from './find-item-by-id.util';
import { checkValidEmail } from './check-valid-email.util';
import { mapKeyAndValue } from './map-key-and-value.util';
import { sortAndGroupByObject } from './sort-and-group-by-object.util';
import { sortAndGroupByArray } from './sort-and-group-by-array.util';


export interface Utils {
  cloneObject: typeof cloneObject;
  compareObject: typeof compareObject;
  countItems: typeof countItems;
  mapToParent: typeof mapToParent;
  randomString: typeof randomString;
  classNames: typeof classNames;
  filterArrayRange: typeof filterArrayRange;
  filterArrayRangeExclusingStart: typeof filterArrayRangeExclusingStart;
  stringifyUrl: typeof stringifyUrl;
  encrypt: typeof encrypt;
  decrypt: typeof decrypt;
  saveToSessionStorage: typeof saveToSessionStorage;
  setSessionStorage: typeof setSessionStorage;
  findItemById: typeof findItemById;
  checkValidEmail: typeof checkValidEmail;
  groupDataForRender: typeof groupDataForRender;
  mapKeyAndValue: typeof mapKeyAndValue;
  sortAndGroupByObject: typeof sortAndGroupByObject;
  sortAndGroupByArray: typeof sortAndGroupByArray;
}

const utils: Utils = {
  cloneObject,
  compareObject,
  countItems,
  mapToParent,
  randomString,
  classNames,
  filterArrayRange,
  filterArrayRangeExclusingStart,
  stringifyUrl,
  encrypt,
  decrypt,
  saveToSessionStorage,
  setSessionStorage,
  findItemById,
  checkValidEmail,
  groupDataForRender,
  mapKeyAndValue,
  sortAndGroupByObject,
  sortAndGroupByArray,
}

export default utils;