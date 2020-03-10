import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import * as actions from '../../store/login/actions';
import { LoginActions } from '../../store/login/types';
import styles from './stylesLogin';

function LoginForm(props: any) {
    const [email, setEmail] = React.useState('');
    const [password, setPass] = React.useState('');
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
        console.log("handle submit");
        props.login(email, password);
    }
  
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
        </div>
    );
  }
  const mapDispatchToProps = (dispatch: Dispatch<LoginActions>) => {
    return {
        login: (email: string, password: string) =>
        dispatch(actions.login(email, password))
    }
  }
  export default compose(
      connect(null, mapDispatchToProps),
      withStyles(styles)
  )(LoginForm);