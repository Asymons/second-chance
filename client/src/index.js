import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';
import { PUBLIC_STRIPE_KEY } from './shared/constants';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer from './reducers/rootReducer';

const { store, persistor, history } = rootReducer();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <StripeProvider apiKey={PUBLIC_STRIPE_KEY}>
                    <App/>
                </StripeProvider>
            </ConnectedRouter>
        </PersistGate>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
