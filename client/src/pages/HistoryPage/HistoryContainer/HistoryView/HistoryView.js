import React from 'react';
import { Button, Card, Input, List } from 'antd';
import HistoryListItem from './HistoryListItem';
import {connect} from 'react-redux';

const HistoryView = (props) => {

    const {data} = props;
    return (
        <div className="history-list-view">
            <List
                dataSource={data}
                renderItem={item =>
                    <HistoryListItem {...item}/>}
            />
        </div>
    );
};

const styles = {
    distance: {
        fontSize: 10,
        color: 'rgba(0,0,0,0.3)',
        padding: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {},
};

const mapStateToProps = (state) => ({
    settings: state.sessionState.settings,
});

export default connect(mapStateToProps)(HistoryView);
