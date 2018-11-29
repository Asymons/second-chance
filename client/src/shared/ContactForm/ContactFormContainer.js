import React from 'react';
import { connect } from 'react-redux';
import ContactFormView from './ContactFormView/ContactFormView';
import validator from 'validator';
import { sendEmailAddress } from '../requests';

class ContactFormContainer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            message: '',
        }
    }

    onSubmitEmail = (e) => {
        const {form} = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            if(validator.isEmail(values.email + '')){
                sendEmailAddress(values.email);
                form.resetFields();
                this.setState({message: 'Email Submitted'});
            }else{
                this.setState({message: 'Invalid email'});
            }
        });
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    render(){
        const {message} = this.state;
        return(
            <ContactFormView
                wrappedComponentRef={this.saveFormRef}
                onSubmitEmail={this.onSubmitEmail}
                message={message}
            />
        );
    }

}

export default ContactFormContainer;
