import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
export type DemoActions = ActionType<typeof actions>;

export enum Constants {
    POPULATE_USER_DETAILS = 'POPULATE_USER_DETAILS',
}

export interface IUserDetails {
    name: string,
    surname: string,
    username: string,
    email : string
}
export interface ILoginState {
    userDetails : IUserDetails | {}
}

export type LoginActions = ActionType<typeof actions>;