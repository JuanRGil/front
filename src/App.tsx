import React from 'react';
import { useCookies, withCookies } from 'react-cookie';
import LoginForm from './components/login/Login';
import Main from './components/main/Main';
import configureAuthorisation from './axiosInterceptors';
import { TokenAndProvider, CookieNames } from './store/login/types';


function App(props: any) {
    const [cookie] = useCookies([CookieNames.AUTH_TOKEN]);
    const { cookies } = props;
    
    const tokenAndProvider : TokenAndProvider = cookie && cookie.auth_token ? cookie.auth_token: {};

    const isAuthenticated = (tokenAndProvider.token !== undefined);
    console.log(cookie);
    console.log("app IS AUTH?: ", isAuthenticated);
    configureAuthorisation(tokenAndProvider as TokenAndProvider, cookies);
    return (
      <React.Fragment>
        {!isAuthenticated ?
        (<div className="App">
          <LoginForm/>
        </div>) : (<Main/>)
        }
      </React.Fragment>
    );
}

export default withCookies(App);
