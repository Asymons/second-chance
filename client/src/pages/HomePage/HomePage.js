import * as React from 'react';
import './HomePage.scss';
import OffersListContainer from '../../shared/Offers/OffersList/OffersListContainer';

const HomePage = (props) => (
    <div>
        <OffersListContainer {...props}/>
    </div>
);

export default HomePage;
