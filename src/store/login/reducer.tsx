import { ILoginState, Constants } from './types';
const init: ILoginState = {
    isAuthenticated: false,
    name: '',
    role: ''
};
export function loginReducer(state: ILoginState = init, 
action: any): ILoginState {
    switch (action.type) {
        case Constants.LOGIN:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                name: action.payload.name,
                role: action.payload.role
            };
        case Constants.LOGOUT:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                name: '',
                role: ''
            };
        default:
            return state;
    }
}