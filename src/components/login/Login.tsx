import React, { useState } from 'react';
import { useCookies } from 'react-cookie'; 
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import GoogleLogin from './GoogleLogin';
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import * as actions from '../../store/login/actions';
import { LoginActions, IUserDetails, TokenAndProvider, Provider, CookieNames } from '../../store/login/types';
import styles from './stylesLogin';

function LoginForm(props: any) {
    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const [cookies, setCookie] = useCookies(['auth_token']);

    const {classes, onPopulateUserDetails} = props;

    const handleUsernameChange = (event: React.ChangeEvent) => {
        console.log(`the event launched is: ${(event.target as HTMLInputElement).value}`);
        setUsername(event && event.target ? (event.target as HTMLInputElement).value : '');
    };

    const handlePassChange = (event: React.ChangeEvent) => {
        console.log(`the event launched is: ${(event.target as HTMLInputElement).value}`);
        setPass(event && event.target ? (event.target as HTMLInputElement).value : '');
    };

    const handleSubmit = () => {
        console.log("handle submit");
        const logingUrl = "http://localhost:8080/api/auth/signin";
        axios.post(logingUrl, {
            username,
            password
        }).then((response : any) => {
            onPopulateUserDetails(response.data.userDetails);
            const token : TokenAndProvider = {
                token:  `${response.data.tokenType} ${response.data.accessToken}`,
                provider: Provider.TICKET_UP
            }
            setCookie(CookieNames.AUTH_TOKEN, JSON.stringify(token), { path: '/' });
        })
    }

    return (
        <div className={classes.container}>
            <FormControl className={classes.centered}>
                <InputLabel htmlFor="username">
                    User Name
                </InputLabel>
                <Input id="username" onChange={handleUsernameChange} value={username}/>
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
            <GoogleLogin/>
        </div>
    );
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
  )(LoginForm);