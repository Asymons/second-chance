import React from 'react';
import { Card, List } from 'antd';
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
        const {
            storeId,
            itemPrice,
            itemDiscount,
            itemName,
            company,
            address,
            offerId,
            onPressListItem,
            onDeleteItem,
            imageUrl,
            isOwner,
        } = this.props;
        const itemInfo = {
            itemFullPrice: itemPrice,
            itemPrice: itemPrice - itemDiscount,
            itemName: itemName,
            offerId: offerId,
            storeId: storeId,
            quantity: 1,
        };

        const listItemProps = isOwner ? {
            actions: [<a style={{zIndex: 2}} onClick={(e) => onDeleteItem(e, itemInfo)}>Delete</a>],
        } : {};

        return (
            <Card style={{cursor: 'pointer'}} onClick={() => onPressListItem(itemInfo)}>
                <List.Item {...listItemProps}>
                    <List.Item.Meta
                        avatar={<img width={100} src={imageUrl}/>}
                        title={itemInfo.itemName}
                        description={<div style={centeredRow}>
                            <div>{itemName}</div>
                            <div>{company}</div>
                            <div>{address}</div>
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
