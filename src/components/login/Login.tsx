import React, {useEffect} from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { PATHS } from '../../constants/Paths';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import * as actions from '../../store/login/actions';
import { IRootState } from '../../store/store';
import { LoginActions, BasicProfileGoogleIn } from '../../store/login/types';
import styles from './stylesLogin';
import { store } from './../../store/store';
import { Redirect } from 'react-router-dom';

function LoginForm(props: any) {
    const {classes, onStoreLoginInfo, isAuthenticated} = props;

    useEffect(()=>{
        sessionStorage.clear();
    })
    const isGoogleLoginResponse = 
    (response: GoogleLoginResponse | GoogleLoginResponseOffline ) 
    : response is GoogleLoginResponse => {
        return (response as GoogleLoginResponse).getBasicProfile() ? true : false;
    }

    const getGoogleResponse = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        console.log("google response", response)
        if (isGoogleLoginResponse(response)) {
            console.log("google response profile", response)
            onStoreLoginInfo(response);
        } else {
            //error
        }
      };

    /*
    const handleSubmit = () => {
        console.log("handle submit");
        props.login(email, password);
    }
    */
    console.log("Login 40 is authenticated", isAuthenticated);
    console.log('state', store.getState());
    return (
        <div className={classes.container}>
            {!isAuthenticated 
            ? (
                <GoogleLogin
                    clientId="87323419200-0r386di22s709lrk72mr2ddcrjbd16n7.apps.googleusercontent.com"
                    onSuccess={getGoogleResponse}
                    onFailure={getGoogleResponse}
                    accessType="offline"
                    isSignedIn={true}
                    icon={false}
                    render={() =><div/>}
                    autoLoad={true}
                    uxMode="redirect"
                    redirectUri="http://localhost:3000/"
                />
            )
            : (<Redirect to={PATHS.MAIN}/>)}
        </div>
    );
  }
  const mapDispatchToProps = (dispatch: Dispatch<LoginActions>) => {
    return {
        onStoreLoginInfo: (userDetails : GoogleLoginResponse) =>
        dispatch(actions.storeLoginInfo(userDetails))
    }
  }
  const mapStateToProps = (state : IRootState) => {
    console.log("login state", state);
    const { isAuthenticated } = state.loginSessionStorage ;
    return { 
        isAuthenticated
    };
  }

  export default compose(
      connect(mapStateToProps, mapDispatchToProps),
      withStyles(styles)
  )(LoginForm);