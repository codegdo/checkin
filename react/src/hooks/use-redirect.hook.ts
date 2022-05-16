import { Location } from 'react-router-dom';
import { concatUrl } from "../utils/concat-url.util";

export enum RedirectTypeEnum {
  SessionTimeout = 'SESSION_TIMEOUT'
}

export type RedirectState = {
  type: RedirectTypeEnum;
  previousLocation: Location;
} | null

export const useRedirect = (state: RedirectState): string => {

  const { type, previousLocation } = state || {};

  switch (type) {
    case 'SESSION_TIMEOUT':
      return previousLocation ? concatUrl(previousLocation) : '/';
    default:
      return '/';
  }
}