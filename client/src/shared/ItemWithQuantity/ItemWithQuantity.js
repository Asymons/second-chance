import React from 'react';
import { Button } from 'antd';
import './ItemWithQuantity.scss';

class ItemWithQuantity extends React.Component {
    render(){
        const {onIncreaseItem, onDecreaseItem, itemQuantity, itemName, itemPrice} = this.props;
        return(
            <div className="item-with-quantity">
                <div className="subcontainer">
                    <Button icon="minus" onClick={onDecreaseItem}/>
                    <div className="item-quantity">
                        {itemQuantity}
                    </div>
                    <Button icon="plus" onClick={onIncreaseItem}/>
                </div>
                <div className="item-name">
                    {itemName}
                </div>
                <div className="item-price">
                    ${itemPrice.toFixed(2)}
                </div>
            </div>
        );
    }
}

export default ItemWithQuantity;
