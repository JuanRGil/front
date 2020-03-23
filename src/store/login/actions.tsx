import { action } from 'typesafe-actions';
import { Constants, BasicProfileGoogleIn } from './types';

export function storeLoginInfo(userDetails : BasicProfileGoogleIn) {
    //call google stuff
    console.log("action userdetails", userDetails);
    console.log(`loging with email ${userDetails.email}`);
    return action(Constants.LOGIN, {
        isAuthenticated: true,
        name: userDetails.givenName,
        role: 'role'
    });
}