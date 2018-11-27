import * as React from 'react';
import LoginCard from './LoginCard/LoginCard';
import './LoginContainer.scss';
import { Redirect } from 'react-router';
import { getToken, getSettings, getRole, getUser } from '../../../shared/requests';
import { connect } from 'react-redux';

class LoginCardContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    onLoginSuccess = async (info) => {
        const {googleId} = info.profileObj;
        const {onSetToken, onSetSettings, onSetRole} = this.props;
        const token = await getToken(googleId);
        onSetToken(token);
        const settings = await getSettings(token);
        onSetSettings(settings);
        const role = (await getUser(token)).role;
        onSetRole(role);
    };

    render() {
        const {token} = this.props;
        if (token !== null) {
            return <Redirect
                push={true}
                to={{
                    pathname: '/home',
                }}
            />;
        }
        return (
            <div className="login-card-container">
                <LoginCard
                    onLoginSuccess={this.onLoginSuccess}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.sessionState.token,
    settings: state.sessionState.settings,
});
const mapDispatchToProps = (dispatch) => ({
    onSetToken: (token) => dispatch({type: 'SET_TOKEN', token}),
    onSetSettings: (settings) => dispatch({type: 'SET_SETTINGS', settings}),
    onSetRole: (role) => dispatch({type: 'SET_ROLE', role}),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginCardContainer);
