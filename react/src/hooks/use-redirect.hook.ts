import { Location, Action } from 'history';
import { concatUrl } from "../utils/concat-url.util";

type PreviousLocation = {
  location?: Location | null | undefined;
  action?: Action | null | undefined;
};

export enum RedirectTypeEnum {
  SessionTimeout = 'SESSION_TIMEOUT'
}

export type RedirectState = {
  type: RedirectTypeEnum;
  previousLocations?: PreviousLocation[];
} | null

export const useRedirect = (state: RedirectState): string => {

  if (!state) {
    return '/';
  }

  const { type, previousLocations } = state;

  switch (type) {
    case 'SESSION_TIMEOUT':
      const locations = [...[previousLocations]].pop() || [];
      const location = [...locations].pop()?.location || {};

      return location ? concatUrl(location) : '/';
    default:
      return '/';
  }
}