import React from 'react';
import PlaceOrderView from './PlaceOrderView';
import { injectStripe } from 'react-stripe-elements';
import { doPayment } from '../requests';
import { compose } from 'redux';
import { connect } from 'react-redux';

class PlaceOrderContainer extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            itemQuantity: 1,
        }
    }

    requestPayment = () => {
        const {itemPrice, storeId, offerId} = this.props.checkoutInfo;
        console.log(this.props);
        const {itemQuantity} = this.state;
        console.log(itemPrice, itemQuantity);
        const itemTax = (itemQuantity * itemPrice * 0.13);
        const totalPrice = Math.ceil((itemQuantity * itemPrice + itemTax));
        console.log(totalPrice);
        console.log(this.props);
        const {stripe, token, history} = this.props;
        const newOrder = {
            offerId: offerId,
            storeId: storeId,
            quantity: itemQuantity,
            created: new Date()
        };
        stripe.createToken().then(stripeToken => {
            console.log(stripeToken);
            doPayment(totalPrice, stripeToken.token.id, token, newOrder).then(() => {
                history.push('/history');
            });
        })
    };

    onIncreaseItem = () => {
        const {itemQuantity} = this.state;
        this.setState({
            itemQuantity: itemQuantity + 1,
        });
    }

    onDecreaseItem = () => {
        const {itemQuantity} = this.state;
        if (itemQuantity > 0) {
            this.setState({
                itemQuantity: itemQuantity - 1,
            });
        }
    }

    render() {
        console.log(this.props);
        const {itemName, itemPrice, itemFullPrice} = this.props.checkoutInfo;
        const {itemQuantity} = this.state;
        const {stripe} = this.props;
        return (
            <PlaceOrderView
                stripe={stripe}
                itemName={itemName}
                itemPrice={itemPrice/100}
                itemFullPrice={itemFullPrice/100}
                itemQuantity={itemQuantity}
                requestPayment={this.requestPayment}
                onDecreaseItem={this.onDecreaseItem}
                onIncreaseItem={this.onIncreaseItem}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.sessionState.token,
    checkoutInfo: state.sessionState.checkoutInfo,
});

export default compose(connect(mapStateToProps),injectStripe)(PlaceOrderContainer);
