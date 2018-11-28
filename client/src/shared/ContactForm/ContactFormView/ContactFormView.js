import React from 'react';
import { Button, Form, Input } from 'antd';
import './ContactFormView.scss';

const FormItem = Form.Item;

const ContactFormView = Form.create()(
    class ContactFormView extends React.Component {
        render() {
            const { onSubmitEmail, form, message } = this.props;
            const { getFieldDecorator } = form;
            return (
                <div className="contact-form-view">
                    <div className="contact-title">
                        Let us introduce ourselves
                    </div>
                    <div className="contact-message">
                        We will reach out to you individually for opportunities on the platform. Stay tuned!
                    </div>
                    <div className="contact-container">
                        <Form className="contact-form">
                            <FormItem className="email-item">
                                {getFieldDecorator('email')(<Input
                                    placeholder="fightfoodwaste@gmail.com"
                                />)}
                            </FormItem>
                        </Form>
                        <Button className="email-submit" onClick={onSubmitEmail}>
                            SUBMIT
                        </Button>
                    </div>
                    <div className="message" style={{display: message ? 'inherit' : 'none'}}>
                        {message}
                    </div>
                </div>
            )
        }
    }
);

export default ContactFormView;
