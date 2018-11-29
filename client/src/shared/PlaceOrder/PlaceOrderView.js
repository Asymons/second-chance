import React from 'react';
import ItemWithQuantity from '../ItemWithQuantity/ItemWithQuantity';
import PriceCalculation from '../PriceCalculation';
import { Button, Card } from 'antd';
import { CardElement } from 'react-stripe-elements';

class PlaceOrderView extends React.Component {
    render() {
        const { requestPayment } = this.props;

        return (
            <div className="place-order-view" style={{width: '100%', display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'}}>
                <Card
                    style={{ width: '100%', maxWidth: 480, }}
                    bodyStyle={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    }}
                >
                    <ItemWithQuantity {...this.props}/>
                    <PriceCalculation {...this.props}/>
                    <div className="check-history" style={{margin: '10px 0'}}>
                        After you submit your order, check your history for pickup information.
                    </div>
                    <div style={{ width: '100%', margin: '10px 0'}}>
                        <CardElement style={{ width: '100%', margin: '10px 0'}}/>
                        <Button onClick={requestPayment} style={{width: '100%', margin: '20px 0'}}>Pay</Button>
                    </div>
                </Card>
            </div>

        );
    }
}

export default PlaceOrderView;
