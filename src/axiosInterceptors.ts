import axios from 'axios';
import { TokenAndProvider, CookieNames } from './store/login/types';

const setRequestAuthorizationHeaderInterceptor = (authToken : TokenAndProvider) => {
    axios.interceptors.request.use(function (config) {
        if (authToken.token) {
            config.headers.Authorization =  authToken.token;
            config.headers.AuthorizationProvider = authToken.provider
            config.headers.GoogleIdToken = authToken.idToken ? authToken.idToken : undefined;
        }
    
        return config;
    });
};

const setResponseInterceptor = (cookies : any) => {
    axios.interceptors.response.use((response) => {
        return response;
    }, function (error) {
        if (401 === error.response.status) {
            cookies.remove(CookieNames.AUTH_TOKEN);
        }
        return error;
    });
};

const configureAuthorisation = (tokenAndProvider : TokenAndProvider, cookies: any) => {
    setRequestAuthorizationHeaderInterceptor(tokenAndProvider);
    setResponseInterceptor(cookies);
}

export default configureAuthorisation;