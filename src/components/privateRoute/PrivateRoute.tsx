import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { IRootState } from '../../store/store';
import { PATHS } from '../../constants/Paths';

const mapStateToProps = (state : IRootState) => {
    const { isAuthenticated } = state.loginSessionStorage;
    return { isAuthenticated };
  }

type ReduxType = ReturnType<typeof mapStateToProps>;

interface IPrivateRoute extends ReduxType {
    path? : string,
    component : React.Component | JSX.Element,
    isAuthenticated:  boolean
}
function PrivateRoute(props : IPrivateRoute) : JSX.Element  {

    const { isAuthenticated, path, component } = props;
    console.log("privateRoute props", props );
    let routeReturned = (<Redirect to={PATHS.LOGIN} />);
    if ( isAuthenticated ) {
        routeReturned = (<Route path={path} exact render={() => component } />)
    }
    return routeReturned;
}

export default connect(mapStateToProps) (PrivateRoute);