import * as React from 'react';
import { Sticky } from 'react-sticky';
import './Header.scss';
import { connect } from 'react-redux';
import { Button } from 'antd';

const logo = require('../../assets/images/templogo.png');

const messages = {
    home: "Home",
    history: "History",
    login: "Login",
    settings: "Settings",
    orderHistory: "Order History",
    signOut: "Sign out"
};

const unauthTabs = [
    {
        title: messages.home,
        url: '/',
    },
    {
        title: messages.login,
        url: '/login',
    },
];


const authTabs = [
    {
        title: messages.home,
        url: '/home',
    },
    {
        title: messages.history,
        url: '/history',
    },
    {
        title: messages.orderHistory,
        url: '/orderHistory',
    },
    {
        title: messages.settings,
        url: '/settings',
    },
    {
        title: messages.signOut,
        url: '/',
    },
];


class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navigate: false,
            to: '',
        };
    }

    generateTabsButtons(tabs) {
        const {onSetToken} = this.props;
        return (
            tabs.map((tabProp, index) =>
                <Button
                    ghost
                    onClick={() => {
                        if (tabProp.title === messages.signOut) {
                            onSetToken(null);
                        }
                        this.setState({
                            navigate: true,
                            to: tabProp.url,
                        });
                    }
                    }
                    className="tab-item"
                    key={index}
                >
                    {tabProp.title}
                </Button>)
        );
    }

    render() {

        const {navigate, to} = this.state;
        const {token, history} = this.props;

        if (navigate) {
            this.setState({
                navigate: false,
            });
            history.push(to);
        }

        return (
            <Sticky>
                {({style}) =>
                    <div className="sticky-content" style={style}>
                        <div className="header-branding">
                            <img src={logo} className="logo"/>
                            <span className="app-name">Second Chance</span>
                        </div>
                        <div className="tabs">
                            {
                                token ?
                                    this.generateTabsButtons(authTabs)
                                    :
                                    this.generateTabsButtons(unauthTabs)
                            }
                        </div>
                    </div>
                }
            </Sticky>
        );

    }
}

const mapStateToProps = (state) => ({
    token: state.sessionState.token,
});

const mapDispatchToProps = (dispatch) => ({
    onSetToken: (token) => dispatch({type: 'SET_TOKEN', token}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
