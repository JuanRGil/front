import { action } from 'typesafe-actions';
import { GoogleLoginResponse } from 'react-google-login';
import { Constants } from './types';

export function storeLoginInfo(userDetails : GoogleLoginResponse) {
    //call google stuff
    console.log("action userdetails", userDetails);
    console.log(`loging with email ${userDetails.profileObj.email}`);
    return action(Constants.LOGIN, {
        isAuthenticated: true,
        name: userDetails.profileObj.givenName,
        role: 'role',
        googleUser: userDetails
    });
}