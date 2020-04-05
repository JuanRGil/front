import { action } from 'typesafe-actions';
import { Constants } from './types';

export function login(email: string, pass: string) {
    console.log(`loging with email ${email} and pass ${pass}`);
    return action(Constants.LOGIN, {
        isAuthenticated: true,
        name: 'aName',
        role: 'Admin'
    });
}

export function logOut() {
    console.log("loging out");
    return action(Constants.LOGOUT, {
        isAuthenticated: false,
    });
}