import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
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
            <Route path={PATHS.LOGIN} exact component={LoginForm} />
            <PrivateRoute component={<Main/>}/>
          </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
