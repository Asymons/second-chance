import * as React from 'react';
import LogoutCard from './LogoutCard/LogoutCard';
import './LogoutPage.scss';

class LogoutPage extends React.Component {

    render() {
        return (
            <div className="logout-page">
                <LogoutCard/>
            </div>
        )
    }
}

export default LogoutPage;
