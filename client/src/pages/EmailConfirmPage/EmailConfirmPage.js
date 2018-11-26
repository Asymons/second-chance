import * as React from 'react';
import { Card } from 'antd';
import './EmailConfirmPage.scss';

const cardBodyStyle = {
    background: '#e8fdf5',
    height: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
};

class EmailConfirmPage extends React.Component {
    render() {
        const email = this.props.location && this.props.location.state.email;
        return (
            <div className="email-confirm-page">
                <Card
                    style={{
                        margin: '10px 0',
                    }}
                    bodyStyle={cardBodyStyle}
                >
                    <div className="header-card-content">
                        Your magic sign in link is in the mail 😃
                    </div>
                </Card>
                <Card>
                    <div className="main-card">
                        <h1 className="title">
                            Please check your inbox!
                        </h1>
                        <div className="content">
                            <span>Click the link sent to </span>
                            <span style={{ fontWeight: 'bold' }}>{email}</span>
                            <span> to log in on this device. You may now close this tab.</span>
                        </div>
                        <h3 className="signature">
                            Catch you on the flip side 🌊
                        </h3>
                    </div>
                </Card>
            </div>
        );
    }
}

export default EmailConfirmPage;
