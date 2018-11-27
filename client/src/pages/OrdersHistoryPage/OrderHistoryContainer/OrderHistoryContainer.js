import React from 'react';
import OrderHistoryView from './OrderHistoryView/OrderHistoryView';
import { connect } from 'react-redux';
import { getOrderHistory } from '../../../shared/requests';
import { Spin } from 'antd';

class OrderHistoryContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            history: []
        };
    }

    async componentDidMount(){
        const {token} = this.props;
        const history = (await getOrderHistory(token)).orders.sort((a,b) => {
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
        console.log(history);
        return(
            history.length === 0 ? <Spin/> :
            <OrderHistoryView data={history}/>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.sessionState.token,
});

export default connect(mapStateToProps)(OrderHistoryContainer);
