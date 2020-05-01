import React from 'react';
import Menu from '../menu/Menu';
import Dashboard from '../dashboard/Dashboard';

function Main(props : any) {
    return (
        <React.Fragment>
            <Menu />
            <Dashboard />
        </React.Fragment>

    )
}

export default Main;