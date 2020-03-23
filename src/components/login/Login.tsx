import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { PATHS } from '../../constants/Paths';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import * as actions from '../../store/login/actions';
import { IRootState } from '../../store/store';
import { LoginActions, BasicProfileGoogleIn } from '../../store/login/types';
import styles from './stylesLogin';
import { store } from './../../store/store';

function LoginForm(props: any) {
    const {classes, onStoreLoginInfo, isAuth} = props;

    const isGoogleLoginResponse = 
    (response: GoogleLoginResponse | GoogleLoginResponseOffline ) 
    : response is GoogleLoginResponse => {
        return (response as GoogleLoginResponse).getBasicProfile() ? true : false;
    }

    const getGoogleResponse = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        console.log("google response", response)
        if (isGoogleLoginResponse(response)) {
            console.log("google response profile", response.profileObj)
            onStoreLoginInfo(response.profileObj);
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
    console.log(isAuth);
    console.log('state', store.getState());
    return (
        <div className={classes.container}>
            {!isAuth &&
                <GoogleLogin
                    clientId="87323419200-0r386di22s709lrk72mr2ddcrjbd16n7.apps.googleusercontent.com"
                    onSuccess={getGoogleResponse}
                    onFailure={getGoogleResponse}
                    isSignedIn={true}
                    render={() => <div/>}
                />
            }
            {isAuth &&
                <Redirect to={PATHS.MAIN} />
            }
        </div>
    );
  }
  const mapDispatchToProps = (dispatch: Dispatch<LoginActions>) => {
    return {
        onStoreLoginInfo: (userDetails : BasicProfileGoogleIn) =>
        dispatch(actions.storeLoginInfo(userDetails))
    }
  }
  const mapStateToProps = (state : IRootState) => {
    console.log("login state", state);
    return { 
        isAuth: state.loginSessionStorage.isAuthenticated 
    };
  }

  export default compose(
      connect(mapStateToProps, mapDispatchToProps),
      withStyles(styles)
  )(LoginForm);