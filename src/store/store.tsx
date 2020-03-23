import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers, createStore } from 'redux';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { rootPersistConfig, loginPersistConfig} from './persistConfigs';
import { loginReducer } from './login/reducer';
import { ILoginState } from './login/types';

export interface IRootState {
    //loginLocalStorage: ILoginState,
    loginSessionStorage: ILoginState & PersistPartial
}

const rootReducer = combineReducers({
    //loginLocalStorage: loginReducer,
    loginSessionStorage: persistReducer(loginPersistConfig, loginReducer),
});
   
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const store = createStore<IRootState & PersistPartial, any, any, any>(
    persistedReducer
);
const persistor = persistStore(store);
export { store, persistor };