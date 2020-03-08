import { action } from 'typesafe-actions';
import { Constants } from './types';
export function login(email: string, pass: string) {
    //call google stuff
    console.log(`loging with email ${email} and pass ${pass}`);
    return action(Constants.LOGIN, {
        isAuthenticated: true,
        name: 'aName',
        role: 'Admin'
    });
}