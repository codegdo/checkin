export * from './utils/types';

import { UtilsInterface } from './utils/types';
import objClone from './utils/obj-clone.util';
import strRandom from './utils/str-random.util';
import mapToParent from './utils/map-to-parent.util';

export const utils: UtilsInterface = {
  objClone,
  strRandom,
  mapToParent
};
