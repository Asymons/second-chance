import React from 'react';
import NoDataFound from '../../NoDataFound';
import OffersListView from './OffersListView';
import { connect } from 'react-redux';
import { addOffer, deleteOffer, getOffers, getOrders, getUser } from '../../requests';

class OffersListContainer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
          offers: [],
            visible: false,
        };
    }

    async componentDidMount(){
        const {token} = this.props;
        console.log('a');
        const stores = await getOffers(token);
        console.log('b');
        const user = await getUser(token);
        console.log('c');
        const orders = await getOrders(token);
        console.log(orders);
        console.log('d');
        const newOffers = [];
        console.log(user);
        stores.forEach((store) => {
            if(user.role !== 'OWNER' || user.stores.find((element) => element._id === store._id)){
                store.offers.forEach((offer) => {
                    newOffers.push({
                        ...store,
                        ...offer,
                        storeId: store._id,
                        offerId: offer._id,
                    })
                });
            }
        });
        console.log(newOffers);
        this.setState({
            offers: newOffers,
        })
    }

    onPressListItem = (cartInfo) => {
        console.log('itemInfo', cartInfo);
        console.log(this.props);
        const {history, onSetCheckoutInfo} = this.props;
        onSetCheckoutInfo(cartInfo);
        console.log(this.props);
        history.push('/order');
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        const {form} = this.formRef.props;
        const {token} = this.props;
        const {offers} = this.state;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            addOffer(token, values);
            const newOffers = offers.concat({...values});
            form.resetFields();
            this.setState({ visible: false, offers: newOffers});
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    onDeleteItem = (itemInfo) => {
        const {offers} = this.state;
        const {token} = this.props;
        deleteOffer(token, itemInfo);
        this.setState({
            offers: offers.filter((element) => itemInfo.offerId !== element.offerId),
        });
    }

    render(){
        const {offers, visible} = this.state;
        return(
            offers.length === 0 ?
                <NoDataFound/> :
                <OffersListView
                    visible={visible}
                    data={offers}
                    onPressListItem={this.onPressListItem}
                    showModal={this.showModal}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    saveFormRef={this.saveFormRef}
                    onDeleteItem={this.onDeleteItem}
                />
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.sessionState.token,
    settings: state.sessionState.settings,
});

const mapDispatchToProps = (dispatch) => ({
    onSetCheckoutInfo: (checkoutInfo) => dispatch({type: 'SET_CHECKOUT_INFO', checkoutInfo}),
});

export default connect(mapStateToProps, mapDispatchToProps)(OffersListContainer);
