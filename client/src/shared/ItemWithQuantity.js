import React from 'react';

class ItemWithQuantity extends React.Component {
    render(){
        const {onIncreaseItem, onDecreaseItem, itemQuantity, itemName, itemPrice} = this.props;
        return(
            <div style={styles.container}>
                <div style={styles.subcontainer}>
                    <span onClick={onDecreaseItem}> - </span>
                    <div>
                        {itemQuantity}
                    </div>
                    <span onClick={onIncreaseItem}> + </span>
                </div>
                <div>
                    {itemName}
                </div>
                <div>
                    ${itemPrice.toFixed(2)}
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    subcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
};

export default ItemWithQuantity;
