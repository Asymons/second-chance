import React from 'react';
import NoDataFound from '../../NoDataFound';
import OffersListView from './OffersListView';
import { connect } from 'react-redux';
import { addOffer, deleteOffer, getOffers, getOrders, getUser } from '../../requests';
import { Spin } from 'antd';

class OffersListContainer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            offers: [],
            visible: false,
            loading: true,
        };
    }

    async componentDidMount(){
        const {token} = this.props;
        const stores = await getOffers(token);
        const user = await getUser(token);
        const newOffers = [];
        stores.forEach((store) => {
            if(user.role !== 'OWNER' || user.stores.find((element) => element.storeId === store._id)){
                store.offers.forEach((offer) => {
                    newOffers.push({
                        ...store,
                        ...offer,
                        storeId: store._id,
                        offerId: offer._id,
                        imageUrl: store.imageUrl,
                    })
                });
            }
        });
        this.setState({
            offers: newOffers,
            loading: false,
        })
    }

    onPressListItem = (cartInfo) => {
        const {history, onSetCheckoutInfo} = this.props;
        onSetCheckoutInfo(cartInfo);
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

            addOffer(token, values);
            const newOffers = offers.concat({...values});
            form.resetFields();
            this.setState({ visible: false, offers: newOffers});
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    onDeleteItem = (e, itemInfo) => {
        e.stopPropagation();
        const {offers} = this.state;
        const {token} = this.props;
        deleteOffer(token, itemInfo);
        this.setState({
            offers: offers.filter((element) => itemInfo.offerId !== element.offerId),
        });
    }

    render(){
        const {role} = this.props;
        const {offers, visible, loading} = this.state;
        const isOwner = role === 'OWNER';
        return(
                <OffersListView
                    visible={visible}
                    data={offers}
                    loading={loading}
                    onPressListItem={this.onPressListItem}
                    showModal={this.showModal}
                    isOwner={isOwner}
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
    role: state.sessionState.role,
});

const mapDispatchToProps = (dispatch) => ({
    onSetCheckoutInfo: (checkoutInfo) => dispatch({type: 'SET_CHECKOUT_INFO', checkoutInfo}),
});

export default connect(mapStateToProps, mapDispatchToProps)(OffersListContainer);
