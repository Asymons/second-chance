import React from 'react';
import OrderHistoryListItem from './OrderHistoryListItem';
import { List } from 'antd';

const OrderHistoryView = (props) => {

    const {data} = props;

    return (
        <div className="order-history-view">
            <List
                dataSource={data}
                renderItem={item =>
                    <OrderHistoryListItem {...item}/>}
            />
        </div>
    );
};

export default OrderHistoryView;
