export * from './utils/types';

import { UtilsInterface } from './utils/types';
import objClone from './utils/obj-clone.util';
import strRandom from './utils/str-random.util';
import mapToParent from './utils/map-to-parent.util';
import classNames from './utils/classnames.util';
import countItems from './utils/count-items.util';

export const utils: UtilsInterface = {
  objClone,
  strRandom,
  classNames,
  mapToParent,
  countItems
};
