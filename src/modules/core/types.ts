import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { CurrentUser } from '../../lib/graphql/user';

export type AuthMode = 'REGISTER' | 'LOGIN';
export type CoreAction = ActionType<typeof actions>;

export type CoreState = {
  layer: boolean;
  auth: {
    visible: boolean;
    mode: AuthMode;
  };
  user: CurrentUser | null;
  popup: {
    title: string | undefined;
    message: string;
    visible: boolean;
  };
};
