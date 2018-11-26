import React from 'react';
import PlaceOrderContainer from '../../shared/PlaceOrder/PlaceOrderContainer';
import { Elements } from 'react-stripe-elements';

const OrderPage = (props) =>
    <Elements>
        <PlaceOrderContainer {...props}/>
    </Elements>

export default OrderPage;
