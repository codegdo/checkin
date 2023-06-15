import { UtilsInterface } from './types';
import objClone from './obj-clone.util';
import strRandom from './str-random.util';
import mapToParent from './map-to-parent.util';

const utils: UtilsInterface = {
  objClone,
  strRandom,
  mapToParent
};

export { utils };
