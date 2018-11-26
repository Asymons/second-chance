import * as React from 'react';
import { Card } from 'antd';
import { white } from '../../../shared/colors';
import './LogoutCard.scss';

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

class LogoutCard extends React.Component {
    render() {
        return (
            <div className="logout-card">
                <Card className="card" bodyStyle={cardBodyStyle}>
                    <h1 className="card-content">
                        Catch you on the flip side 🌊
                    </h1>
                </Card>
            </div>
        );
    }
}

export default LogoutCard;
