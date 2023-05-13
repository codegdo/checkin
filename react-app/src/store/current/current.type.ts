import { AppStatus } from '../../constants';

export interface CurrentState {
  appId?: number | null;
  appStatus?: AppStatus;

}