import React, { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import * as actions from '../../store/login/actions';
import { LoginActions } from '../../store/login/types';
import styles from './stylesLogin';

function LoginForm(props: any) {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [googleAuthObject, setGoogleAuthObject] = useState();
    const [googleCurrentUser, setGoogleCurrentUser] = useState();
    const {classes} = props;

    const handleEmailChange = (event: React.ChangeEvent) => {
        console.log(`the event launched is: ${(event.target as HTMLInputElement).value}`);
        setEmail(event && event.target ? (event.target as HTMLInputElement).value : '');
    };

    const handlePassChange = (event: React.ChangeEvent) => {
        console.log(`the event launched is: ${(event.target as HTMLInputElement).value}`);
        setPass(event && event.target ? (event.target as HTMLInputElement).value : '');
    };

    const handleSubmit = () => {
        const { login } = props;
        console.log("handle submit");
        login(email, password);
    }

    const handleGoogleSubmit = () => {
        const { login } = props;
        console.log('google login');
        (googleAuthObject as any).signIn()
        .then((googleUserLogged: any) => {
            const basicProfile = googleUserLogged.getBasicProfile();
            setGoogleCurrentUser(googleUserLogged);
            login(basicProfile.getEmail(), basicProfile.getName());
        });
    }

    interface MyWindow extends Window {
        gapi: any;
    }

    const params = {
        client_id: '87323419200-0r386di22s709lrk72mr2ddcrjbd16n7.apps.googleusercontent.com',
        ux_mode: 'popup'
    }

    function loadLoginApi() {
        const { gapi } = (window as MyWindow & typeof globalThis); 
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
        const { logOut, login } = props; 
        console.log("listener result :", isSignIn)
        
        if (isSignIn) {
            // googleAuthObject cant be undefined as the user is logged in
            console.log("google user has signed");
        } else {
            logOut();
        } 
    }
    
    useEffect(() => {
        loadLoginApi();
    }, []);

    return (
        <div className={classes.container}>
            <FormControl className={classes.centered}>
                <InputLabel htmlFor="email">
                    Email address
                </InputLabel>
                <Input id="email" type="email" onChange={handleEmailChange} value={email}/>
                <FormHelperText id="my-helper-text">
                    We'll never share your email.
                </FormHelperText>
            </FormControl>
            <FormControl className={classes.centered}>
                <InputLabel htmlFor="password">
                    Password
                </InputLabel>
                <Input id="password" type="password" onChange={handlePassChange} value={password}/>
                <FormHelperText id="my-helper-text">We'll never share your password.</FormHelperText>
            </FormControl>
            <Button className={classes.centered} variant="contained" color="primary" onClick={handleSubmit}>
                Login
            </Button>
            <Button className={classes.centered} variant="contained" color="primary" onClick={handleGoogleSubmit}>
                Google Login
            </Button>
        </div>
    );
  }
  const mapDispatchToProps = (dispatch: Dispatch<LoginActions>) => {
    return {
        login: (email: string, password: string) =>
        dispatch(actions.login(email, password)),
        logOut: () =>
        dispatch(actions.logOut())

    }
  }
  export default compose(
      connect(null, mapDispatchToProps),
      withStyles(styles)
  )(LoginForm);