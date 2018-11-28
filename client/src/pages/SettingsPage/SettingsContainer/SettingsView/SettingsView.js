import React from 'react';
import { Button, Card, Icon, Input, List, Upload } from 'antd';
import './SettingsView.scss';

const SettingsView = (props) => {

    const { radius, lat, lng } = props.settings;
    const unsavedRadius = props.unsavedSettings.radius;
    const unsavedLat = props.unsavedSettings.lat;
    const unsavedLng = props.unsavedSettings.lng;

    const { onChangeSettings, onSaveSettings, uploadProps } = props;

    console.log('Current Settings', props.settings)

    const listOfSettings = [
        <div className="setting-tab">
            <Input
                defaultValue={unsavedRadius}
                addonAfter={<div className="saved-distance">{radius} km</div>}
                placeholder="Enter search radius in km"
                onChange={(e) => onChangeSettings({ ...props.unsavedSettings, radius: Number(e.target.value) })}
            />
        </div>,
        <div className="setting-tab">
            <Input
                defaultValue={unsavedLat}
                addonAfter={<div className="saved-lat">{lat}</div>}
                placeholder="Enter lat or allow location"
                onChange={(e) => onChangeSettings({ ...props.unsavedSettings, lat: Number(e.target.value) })}
            />
        </div>,
        <div className="setting-tab">
            <Input
                defaultValue={unsavedLng}
                addonAfter={<div className="saved-distance">{lng}</div>}
                placeholder="Enter lng or allow location"
                onChange={(e) => onChangeSettings({ ...props.unsavedSettings, lng: Number(e.target.value) })}
            />
        </div>,
        <div className="setting-tab">
            <Upload {...uploadProps}>
                <Button enctype="multipart/form-data">
                    <Icon type="upload"/> Click to Upload
                </Button>
            </Upload>
        </div>
    ];

    return (
        <div className="settings-view">
            <Card>
                <h2>
                    Settings
                </h2>
                <List
                    dataSource={listOfSettings}
                    renderItem={(item) => item}
                />
                <Button style={{ margin: 10 }} onClick={() => onSaveSettings(props.unsavedSettings)}>Save</Button>
            </Card>
        </div>
    );
};


export default SettingsView;
