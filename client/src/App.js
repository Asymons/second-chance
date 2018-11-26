import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import OrderPage from './pages/OrderPage/OrderPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import { StickyContainer } from 'react-sticky';
import Header from './shared/Header/Header';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import LandingPage from './pages/LandingPage/LandingPage';
import OrderHistoryPage from './pages/OrdersHistoryPage/OrdersHistoryPage';

const App = () => (
    <div className="App">
        <div className="container" style={{ width: '100%' }}>
            <StickyContainer>
                <Route component={Header}/>
                <Switch>
                    <Route
                        exact={true}
                        path="/"
                        component={LandingPage}
                    />
                    <Route
                        exact={true}
                        path="/home"
                        component={HomePage}
                    />
                    <Route
                        exact={true}
                        path="/order"
                        component={OrderPage}
                    />
                    <Route
                        exact={true}
                        path="/login"
                        component={LoginPage}
                    />
                    <Route
                        exact={true}
                        path="/settings"
                        component={SettingsPage}
                    />
                    <Route
                        exact={true}
                        path="/history"
                        component={HistoryPage}
                    />
                    <Route
                        exact={true}
                        path="/orderHistory"
                        component={OrderHistoryPage}
                    />
                </Switch>
            </StickyContainer>
        </div>
    </div>
);

export default App;
