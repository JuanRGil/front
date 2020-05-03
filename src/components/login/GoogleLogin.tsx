import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie'; 
import compose from 'recompose/compose';
import { withStyles, Button } from '@material-ui/core';
import styles from './stylesLogin';
import { Dispatch } from 'redux';
import { LoginActions, IUserDetails, TokenAndProvider, Provider, CookieNames } from '../../store/login/types';
import { params } from '../../google_gapi/gapi';
import * as actions from '../../store/login/actions';

const GoogleLogin = (props : any) => {

    const [googleAuthObject, setGoogleAuthObject] = useState({});
    const [cookies, setCookie] = useCookies(['google_auth_token']);

    const handleGoogleSubmit = () => {
        const { onPopulateUserDetails } = props;
        console.log('google login');
        (googleAuthObject as any).signIn({prompt: 'select_account'})
        .then((googleUserLogged: any) => {
            const basicProfile = googleUserLogged.getBasicProfile();
            console.log("basicprofile: ",basicProfile);
            onPopulateUserDetails({
                name: basicProfile.getName(),
                surname: basicProfile.getFamilyName(),
                username: basicProfile.getEmail(),
                email: basicProfile.getEmail()
            });
            const authResponse = googleUserLogged.getAuthResponse(true);
            const token : TokenAndProvider = {
                token:  `${authResponse.token_type} ${authResponse.access_token}`,
                provider: Provider.GOOGLE,
                idToken: authResponse.id_token
            }
            setCookie(CookieNames.AUTH_TOKEN, JSON.stringify(token), { path: '/' });
        });
    }
    
    function loadLoginApi() {
        //const { gapi } = (window as MyWindow & typeof globalThis); 
        gapi.load('auth2', function() {
            gapi.auth2
                .init(params)
                .then((response: any) => {
                    console.log('init response: ', response);
                    const googleAuthObject = gapi.auth2.getAuthInstance();
                    setGoogleAuthObject(googleAuthObject);
                    console.log("signed in", googleAuthObject.isSignedIn.get());
                    googleAuthObject.isSignedIn.listen(googleLogOut);
                })
        });
    }
    const googleLogOut = (isSignIn: Boolean) => {
        //const { logOut, login } = props; 
        console.log("listener result :", isSignIn)
        
        if (isSignIn) {
            // googleAuthObject can't be undefined as the user is logged in
            console.log("google user has signed");
        } else {
            //logOut();
        } 
    }
    
    useEffect(() => {
        loadLoginApi();
    }, []);

    const { classes } = props;
    return(
    <Button className={classes.centered} variant="contained" color="primary" onClick={handleGoogleSubmit}>
        Google Login
    </Button>
    )
}

const mapDispatchToProps = (dispatch: Dispatch<LoginActions>) => {
    return {
        onPopulateUserDetails: (userDetails : IUserDetails) =>
        dispatch(actions.populateUserDetails(userDetails))

    }
  }

export default compose(
    connect(null, mapDispatchToProps),
    withStyles(styles)
)(GoogleLogin);