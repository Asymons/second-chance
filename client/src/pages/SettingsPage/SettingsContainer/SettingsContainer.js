import React from 'react';
import SettingsView from './SettingsView/SettingsView';
import { connect } from 'react-redux';
import validator from 'validator';
import { getUploadProps } from '../../../shared/requests';
import {message} from 'antd';

class SettingsContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            settings: props.settings
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((location) => {
            const { settings } = this.props;
            this.onSaveSettings({
                ...settings,
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
            console.log(location);
        });
    }

    onChangeSettings = async (settings) => {
        this.setState({
            settings,
        });
    }

    onSaveSettings = (settings) => {
        const { onSetSettings } = this.props;
        const { radius, lat, lng } = settings;
        if (validator.isInt(radius + '') && validator.isNumeric(lat + '') && validator.isNumeric(lng + '')) {
            onSetSettings(settings);
        }
    }

    render() {
        const unsavedSettings = this.state.settings;
        const { token, settings, role } = this.props;

        const uploadProps = getUploadProps(token, message);

        return (
            <SettingsView
                unsavedSettings={unsavedSettings}
                settings={settings}
                onChangeSettings={this.onChangeSettings}
                onSaveSettings={this.onSaveSettings}
                uploadProps={uploadProps}
                role={role}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.sessionState.token,
    settings: state.sessionState.settings,
    role: state.sessionState.role
});
const mapDispatchToProps = (dispatch) => ({
    onSetSettings: (settings) => dispatch({ type: 'SET_SETTINGS', settings }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
