import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { GoogleLoginResponse } from "react-google-login";

export type DemoActions = ActionType<typeof actions>;
type BasicProfileGoogle = Pick<GoogleLoginResponse, "profileObj">;
export type BasicProfileGoogleIn = {[K in keyof BasicProfileGoogle["profileObj"]]: BasicProfileGoogle["profileObj"][K]}
export enum Constants {
    LOGIN = 'LOGIN'
}
export interface ILoginState {
    isAuthenticated: boolean,
    name: string,
    role: string
}

export type LoginActions = ActionType<typeof actions>;