import React from 'react';
import ReactDOM from 'react-dom';
import "regenerator-runtime/runtime";

import { Provider } from 'react-redux';

import App from './components/App';
import { authRequest } from "./providers/AuthProvider/actions";
import { store } from './store';
import './assets/styles/mainStyles';

Promise.resolve(store.dispatch(authRequest()));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

