import { combineReducers, createStore } from 'redux';
import { loginReducer } from './login/reducer';
import { ILoginState } from './login/types';
export interface IRootState {
    login: ILoginState
}
const store = createStore<IRootState, any, any, any>(
    combineReducers({
        login: loginReducer
}));
export default store;