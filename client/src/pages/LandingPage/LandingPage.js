import * as React from 'react';
import './LandingPage.scss';
import ContactFormContainer from '../../shared/ContactForm/ContactFormContainer';

const landingBanner = require('../../assets/images/landing-banner.webp');
const produceImage = require('../../assets/images/produce.webp');

const LandingPage = (props) => (
    <div className="landing-page">
        <div className="section-intro" style={{backgroundImage: `url(${landingBanner})`}}>
            <div className="left">
                <div className="intro-message">
                    Give food a second chance
                </div>
                <div className="intro-desc">
                    Connect with local stores and buy food that would've been thrown out.
                </div>
            </div>
            <div className="right"/>
        </div>
        <div className="section-about">
            <div className="left">
                <div className="produce-image" style={{backgroundImage: `url(${produceImage})`}}/>
            </div>

            <div className="right">
                <div className="about-title">
                    Reduce food waste
                </div>

                <div className="about-info">
                    Every day stores throw out over 400 tonnes of food that could be eaten. Not only is this bad for the environment, but businesses miss an opportunity to sell these foods at a discount rate.
                    <br/>
                    <br/>

                    Second Chance is a service designed to give food a second chance by connecting consumers to local stores that could not sell their surplus.
                    <br/>
                    <br/>

                    Try out Second Chance for free today!
                </div>
            </div>
        </div>
        <ContactFormContainer/>
        <div className="footer">
            Have questions? Send me an email at alessiosymons@gmail.com
            <br/>
            <br/>
            Copyright © 2018 Alessio Symons
        </div>
    </div>
);

export default LandingPage;
