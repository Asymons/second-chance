import React from 'react';
import OffersListItem from './OffersListItem/OffersListItem';
import { Button, Form, Input, List, Modal } from 'antd';
import { connect } from 'react-redux';

const FormItem = Form.Item;

const OfferAddModal = Form.create()(
    class OfferAddModal extends React.Component {
        render() {
            const { visible, handleOk, handleCancel, form } = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    title="Add Offer"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form className="login-form">
                        <FormItem>
                            {getFieldDecorator('itemName')(<Input
                                placeholder="Offer title e.g. Loaf of Bread"
                            />)}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('itemPrice')(<Input
                                placeholder="Original offer price in cents e.g. 500"
                            />)}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('itemDiscount')(<Input
                                placeholder="New discounted price in cents e.g. 250"
                            />)}
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
)

class OffersListView extends React.Component {
    render() {
        const {
            data,
            onPressListItem,
            settings,
            visible,
            showModal,
            handleOk,
            handleCancel,
            saveFormRef,
            onDeleteItem,
            showAddOffer,
        } = this.props;
        return (
            <div className="offers-list-view" style={{ margin: 10 }}>
                <OfferAddModal
                    wrappedComponentRef={saveFormRef}
                    visible={visible}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                />
                {
                    showAddOffer ?
                        <div className="edit-offers">
                            <Button onClick={showModal}>Add Offer</Button>
                        </div> : null
                }
                <div style={styles.distance}>
                    Offers in a {settings.radius} km radius.
                </div>
                <List
                    dataSource={data}
                    renderItem={item =>
                        <OffersListItem {...item} onPressListItem={onPressListItem} onDeleteItem={onDeleteItem}/>}
                />
            </div>
        );
    }
}

const styles = {
    distance: {
        fontSize: 10,
        color: 'rgba(0,0,0,0.3)',
        padding: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {},
};


const mapStateToProps = (state) => ({
    settings: state.sessionState.settings,
});

export default connect(mapStateToProps)(OffersListView);
