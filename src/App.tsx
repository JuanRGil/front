import React from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import PrivateRoute from './components/privateRoute/PrivateRoute';
import { PATHS } from './constants/Paths';
import LoginForm from './components/login/Login';
import Main from './components/main/Main';

type Params = {
  prop : string;
}
type PropsType = RouteComponentProps<Params>;

class App extends React.Component<PropsType> {
  render(){
    console.log("App mounted");
    return (
      <React.Fragment>
          <Switch>
            <Route path={PATHS.LOGIN} component={LoginForm} />
            <PrivateRoute path={PATHS.MAIN} component={<Main/>}/>
            <Redirect to={PATHS.LOGIN}/>
          </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
