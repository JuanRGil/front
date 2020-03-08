import React from 'react';
import LoginForm from './components/login/Login';
import Main from './components/main/Main';
import { IRootState } from './store';
import { connect } from 'react-redux';

const mapStateToProps = ({ login }: IRootState) => {
  const { isAuthenticated } = login;
  return { isAuthenticated };
}

type ReduxType = ReturnType<typeof mapStateToProps>;

class App extends React.Component<ReduxType> {
  render(){
    const {isAuthenticated} = this.props
    return (
      <React.Fragment>
        {!isAuthenticated ?
        (<div className="App">
          <LoginForm/>
        </div>) : (<Main/>)
        }
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(App);
