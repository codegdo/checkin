import { sortAndGroupByArray } from "./sort-and-group-by-array.util";
import { mapKeyAndValue } from "./map-key-and-value.util";
import { sortAndGroupByObject } from "./sort-and-group-by-object.util";
import { groupDataForRender } from "./group-data-for-render.util";

export interface IUtils {
  groupDataForRender: typeof groupDataForRender;
  mapKeyAndValue: typeof mapKeyAndValue;
  sortAndGroupByObject: typeof sortAndGroupByObject;
  sortAndGroupByArray: typeof sortAndGroupByArray;
}