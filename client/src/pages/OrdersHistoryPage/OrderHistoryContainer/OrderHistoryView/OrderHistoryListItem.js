import React from 'react';
import { Card, List } from 'antd';
import './OrderHistoryListItem.scss';
import moment from 'moment';

const centeredRow = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
};

class OrderHistoryListItem extends React.Component {

    render() {
        const {
            total,
            itemPrice,
            itemDiscount,
            itemName,
            company,
            address,
            created,
            orderedBy,
            imageUrl
        } = this.props;
        const itemInfo = {
            itemFullPrice: itemPrice,
            itemPrice: itemPrice - itemDiscount,
            itemName: itemName
        };
        return (
            <Card>
                <List.Item>
                    <List.Item.Meta
                        avatar={<img width={100} src={imageUrl}/>}
                        title={itemInfo.itemName}
                        description={<div style={centeredRow}>
                            <div>{itemName}</div>
                            <div>{company}</div>
                            <div>{address}</div>
                            <div>Ordered by: {orderedBy}</div>
                            <div>Ordered: {moment(created).fromNow()}</div>
                        </div>}
                    />
                    <div>
                        ${(total/100).toFixed(2)}
                    </div>
                </List.Item>
            </Card>

        );
    }
}

export default OrderHistoryListItem;
