const authHelper = require('../helpers/authHelper');
const dbHelper = require('../helpers/dbHelper');
const calcHelper = require('../helpers/calcHelper');
const uuid = require('uuid/v4');
const { check } = require('express-validator/check');
const validator = require('validator');

const MAX_KM = 100;

const offerValidator = (req, res, next) => {
    const {offer} = req.body;
    const { itemPrice, itemDiscount} = offer;
    if (!(validator.isInt(itemPrice + '') &&
        validator.isInt(itemDiscount + ''))) {
        return res.status(400).send({ message: 'Invalid input' });
    } else {
        next();
    }
};

module.exports = (app) => {

    app.get('/api/offers',
        authHelper.isUserAuthorized,
        [
            check('lat').isLatLong(),
            check('lng').isLatLong(),
            check('dist').isNumeric().custom((value) => value <= MAX_KM)
        ],
        async (req, res) => {
            const { lat, lng, dist } = req.query;
            const stores = await dbHelper.getAllStores();
            if (!lat || !lng || !dist) {
                res.send({ stores, message: 'Stores found' })
            } else if (lat && lng && dist) {
                const nearbyStores = [];
                stores.forEach((store) => {
                    if (calcHelper.calcCrow(lat, lng, store.lat, store.lng) <= dist) {
                        nearbyStores.push(store);
                    }
                });
                res.send({ stores: nearbyStores, message: 'Nearby stores found' });
            }
        });
    app.post('/api/offer',
        authHelper.isUserAuthorized,
        offerValidator,
        async (req, res) => {
            const userId = req.decoded;
            const { offer } = req.body;
            const user = await dbHelper.getUser(userId);
            if (user.stores.length === 0) {
                res.status(400).send({ message: 'User has no stores' });
            } else {
                // TODO: Allow user to have multiple stores later.
                const {storeId} = user.stores[0];
                await dbHelper.addOffer(storeId, { ...offer, offerId: uuid() });
                res.send({ message: 'Offer added', offer });
            }
        }
    );

    app.delete('/api/offer', authHelper.isUserAuthorized, async (req, res) => {
        const userId = req.decoded;
        const { offer } = req.body;
        const user = await dbHelper.getUser(userId);
        if (user.stores.length === 0) {
            res.status(400).send({ message: 'User has no stores' });
        } else {
            const {storeId} = user.stores[0];
            await dbHelper.deleteOffer(storeId, offer.offerId);
            res.send({ message: 'Offer deleted', offer });
        }
    });
    app.post('/api/store', authHelper.isUserAuthorized, async (req, res) => {
        const userId = req.decoded;
        const user = await dbHelper.getUser(userId);
        if(user.role === 'ADMIN'){
            const { storeInfo } = req.body;
            await dbHelper.saveStore(storeInfo);
            res.send({ message: 'Store sent' });
        }else{
            res.send({message: 'Unauthorized'})
        }
    });

};
