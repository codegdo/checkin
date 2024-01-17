import { sortAndGroupByKey } from "./sort-and-group-by-key.util";
import { mapKeyAndValue } from "./map-key-and-value.util";

export interface IUtils {
  mapKeyAndValue: typeof mapKeyAndValue,
  sortAndGroupByKey: typeof sortAndGroupByKey
}