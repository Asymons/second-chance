import React from 'react';
import HistoryView from './HistoryView/HistoryView';
import { getHistory } from '../../../shared/requests';
import NoDataFound from '../../../shared/NoDataFound';
import { connect } from 'react-redux';

class HistoryContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            history: []
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
        })
    }

    render(){
        const {history} = this.state;
        return (
            history.length === 0 ? <NoDataFound/> : <HistoryView data={history}/>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.sessionState.token,
});

export default connect(mapStateToProps)(HistoryContainer);
