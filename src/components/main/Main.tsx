import React from 'react';
import { store } from './../../store/store';

function Main(props : any) {
    console.log('state', store.getState());
    return (
        <React.Fragment>
            <div>Main WIP</div>
        </React.Fragment>

    )
}

export default Main;