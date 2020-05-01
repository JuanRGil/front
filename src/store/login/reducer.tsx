import { ILoginState, Constants } from './types';
const init: ILoginState = {
    userDetails: {}
};
export function loginReducer(state: ILoginState = init, 
action: any): ILoginState {
    switch (action.type) {
        case Constants.POPULATE_USER_DETAILS:
            return {
                ...state,
                userDetails: action.payload.userDetails
            };
        default:
            return state;
    }
}