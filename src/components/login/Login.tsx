import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/login/actions';
import { LoginActions } from '../../store/login/types';
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
  
  function LoginForm(props: any) {
    const [email, setEmail] = React.useState('');
    const [password, setPass] = React.useState('');

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
        <React.Fragment>
            <FormControl>
                <InputLabel htmlFor="email">
                    Email address
                </InputLabel>
                <Input id="email" type="email" onChange={handleEmailChange} value={email}/>
                <FormHelperText id="my-helper-text">
                    We'll never share your email.
                </FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="password">
                    Password
                </InputLabel>
                <Input id="password" type="password" onChange={handlePassChange} value={password}/>
                <FormHelperText id="my-helper-text">We'll never share your password.</FormHelperText>
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Login
            </Button>
        </React.Fragment>
    );
  }
  const mapDispatchToProps = (dispatch: Dispatch<LoginActions>) => {
    return {
        login: (email: string, password: string) =>
        dispatch(actions.login(email, password))
    }
  }
  export default connect(null, mapDispatchToProps) (LoginForm);