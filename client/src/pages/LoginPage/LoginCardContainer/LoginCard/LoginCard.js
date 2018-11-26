import * as React from 'react';
import { Card } from 'antd';
import './LoginCard.scss';
import { white } from '../../../../shared/colors';
import { GoogleLogin } from 'react-google-login';
import { PUBLIC_GOOGLE_AUTH_KEY } from '../../../../shared/constants';

const cardBodyStyle = {
    background: white,
    height: 200,
    width: '100%',
    maxWidth: 600,
    paddingLeft: 120,
    paddingRight: 120,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const LoginCard = props => (
    <div className="login-card">
        <Card
            className="card"
            bodyStyle={cardBodyStyle}
        >
            <div className="card-content">
                <GoogleLogin
                    icon={true}
                    clientId={PUBLIC_GOOGLE_AUTH_KEY}
                    buttonText="GOOGLE LOGIN"
                    onSuccess={props.onLoginSuccess}
                />
            </div>
        </Card>
    </div>
);

export default LoginCard;
