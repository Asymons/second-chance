import React from 'react';
import { Card, List } from 'antd';
import mrMeatImage from '../../../../assets/images/mrmeat-logo.jpg';
import './OffersListItem.scss';

const centeredRow = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
};

class OffersListItem extends React.Component {

    render() {
        const { storeId, itemPrice, itemDiscount, itemName, company, address, offerId, onPressListItem, onDeleteItem } = this.props;
        console.log(this.props);
        const itemInfo = {
            itemFullPrice: itemPrice,
            itemPrice: itemPrice - itemDiscount,
            itemName: itemName,
            offerId: offerId,
            storeId: storeId,
            quantity: 1,
        };
        return (
            <Card>
                <List.Item onClick={() => onPressListItem(itemInfo)} actions={[<a onClick={() => onDeleteItem(itemInfo)}>Delete</a>]}>
                    <List.Item.Meta
                        avatar={<img width={100} src={mrMeatImage}/>}
                        title={itemInfo.itemName}
                        description={<div style={centeredRow}>
                            <div>{itemName}</div>
                            <div>{company}</div>
                            <div>{address} - 0.3 km away</div>
                        </div>}
                    />
                    <div>
                        ${(itemInfo.itemPrice/100).toFixed(2)}
                    </div>
                </List.Item>
            </Card>

        );
    }
}

export default OffersListItem;
