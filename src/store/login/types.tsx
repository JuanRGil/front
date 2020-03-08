import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
export type DemoActions = ActionType<typeof actions>;

export enum Constants {
    LOGIN = 'LOGGIN'
}
export interface ILoginState {
    isAuthenticated: boolean,
    name: string,
    role: string
}

export type LoginActions = ActionType<typeof actions>;