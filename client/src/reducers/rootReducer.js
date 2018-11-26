import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { persistReducer, persistStore } from 'redux-persist';
import { applyMiddleware, compose, createStore } from 'redux';
import createBrowserHistory from 'history/createBrowserHistory';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

const persistConfig = {
    key: 'root',
    storage,
};

const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    sessionState: sessionReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    const store = createStore(
        persistedReducer,
        compose(applyMiddleware(
            routerMiddleware(history),
        ))
    );
    const persistor = persistStore(store);
    return { store, persistor, history }
}
