import React from 'react';

class PriceCalculation extends React.Component {

    render(){
        const {itemName, itemQuantity, itemPrice, itemFullPrice} = this.props;
        const itemDiscount = (itemQuantity * (itemFullPrice - itemPrice)).toFixed(2);
        const itemTax = (itemQuantity * itemPrice * 0.13);
        const totalPrice = (itemQuantity * itemPrice + itemTax).toFixed(2);
        return(
            <div style={{width: '100%', margin: '10px 0'}}>
                <div style={styles.container}>
                    <div>
                        {`${itemQuantity}x ${itemName}`}
                    </div>
                    <div>
                        {`$${(itemQuantity * itemFullPrice).toFixed(2)}`}
                    </div>
                </div>
                <div style={styles.container}>
                    <div>
                        Discount
                    </div>
                    <div>
                        {`-$${itemDiscount}`}
                    </div>
                </div>
                <div style={styles.container}>
                    <div>
                        Tax
                    </div>
                    <div>
                        {`$${itemTax.toFixed(2)}`}
                    </div>
                </div>
                <div style={{...styles.container, fontWeight: 'bold'}}>
                    <div>
                        Total
                    </div>
                    <div>
                        {`$${totalPrice}`}
                    </div>
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
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
};

export default PriceCalculation;
