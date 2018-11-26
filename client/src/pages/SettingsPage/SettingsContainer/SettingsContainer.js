import React from 'react';
import SettingsView from './SettingsView/SettingsView';
import { connect } from 'react-redux';
import validator from 'validator';

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
        const { settings } = this.props;

        return (
            <SettingsView
                unsavedSettings={unsavedSettings}
                settings={settings}
                onChangeSettings={this.onChangeSettings}
                onSaveSettings={this.onSaveSettings}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    settings: state.sessionState.settings,
});
const mapDispatchToProps = (dispatch) => ({
    onSetSettings: (settings) => dispatch({ type: 'SET_SETTINGS', settings }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
