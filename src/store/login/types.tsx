import { ActionType } from 'typesafe-actions';
import { GoogleLoginResponse } from 'react-google-login';
import * as actions from './actions';

export type DemoActions = ActionType<typeof actions>;
export type BasicProfileGoogleIn = GoogleLoginResponse["profileObj"];
export enum Constants {
    LOGIN = 'LOGIN'
}
export interface ILoginState {
    isAuthenticated: boolean,
    name: string,
    role: string,
    googleUser? : GoogleLoginResponse
}

export type LoginActions = ActionType<typeof actions>;