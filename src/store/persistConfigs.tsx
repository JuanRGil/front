import storage from 'redux-persist/lib/storage'
import sessionStorage from 'redux-persist/lib/storage/session'

// WhiteList and blacklist are optional, if we dont add none 
// it will persist all the reducers
export const rootPersistConfig = {
    key: 'root',
    storage: sessionStorage,
    whiteList: ['loginLocalStorage'],
    blackList: ['loginSessionStorage'],
}

export const loginPersistConfig = {
    key: 'login',
    storage: sessionStorage,
    whiteList: ['loginSessionStorage'],
}