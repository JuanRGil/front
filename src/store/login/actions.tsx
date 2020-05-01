import { action } from 'typesafe-actions';
import { Constants, IUserDetails } from './types';


export function populateUserDetails(userDetails : IUserDetails) {
    console.log(`loging with user ${userDetails.username}`);
    return action(Constants.POPULATE_USER_DETAILS, {
        userDetails
    });
}