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

export enum Provider {
    GOOGLE = 'Google',
    TICKET_UP = 'Ticket UP'
}
export enum CookieNames {
    AUTH_TOKEN = 'auth_token'
}
export interface TokenAndProvider {
    token: string,
    idToken?: string,
    provider: Provider
}
export interface ILoginState {
    userDetails : IUserDetails | {}
}

export type LoginActions = ActionType<typeof actions>;