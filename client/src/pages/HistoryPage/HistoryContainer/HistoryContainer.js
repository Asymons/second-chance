import React from 'react';
import HistoryView from './HistoryView/HistoryView';
import { getHistory } from '../../../shared/requests';
import { connect } from 'react-redux';
import { Spin } from 'antd';

class HistoryContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            history: [],
            loading: true
        };
    }

    async componentDidMount(){
        const {token} = this.props;
        const history = (await getHistory(token)).userHistory.sort((a,b) => {
            if(a.created < b.created){
                return 1;
            }else if(a.created === b.created){
                return 0;
            }else {
                return -1;
            }
        });
        this.setState({
            history,
            loading: false,
        })
    }

    render(){
        const {history, loading} = this.state;
        return (
            loading ? <Spin/> : <HistoryView data={history}/>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.sessionState.token,
});

export default connect(mapStateToProps)(HistoryContainer);
