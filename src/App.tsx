import React from 'react';
import { useCookies } from 'react-cookie';
import LoginForm from './components/login/Login';
import Main from './components/main/Main';
import { connect } from 'react-redux';


function App(props: any) {
    const [cookie] = useCookies();
    const isAuthenticated = (cookie.auth_token !== undefined) || (cookie.google_auth_token !== undefined);
    console.log(cookie);
    console.log("app IS AUTH?: ", isAuthenticated);
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

export default App;
