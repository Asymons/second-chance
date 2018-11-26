const authHelper = require('../helpers/authHelper');
const dbHelper = require('../helpers/dbHelper');
const calcHelper = require('../helpers/calcHelper');

module.exports = (app) => {

    app.get('/api/history', authHelper.isUserAuthorized, async (req, res) => {
        const userId = req.decoded;
        const history = await dbHelper.getHistoryFromUser(userId);

        const userHistory = await Promise.all(history.map(async (historyObj) => {
            const store = await dbHelper.getStore(historyObj.storeId);
            const newHistoryObj = JSON.parse(JSON.stringify(historyObj));
            const offer = store.offers.find((offer) => {
                const newOffer = JSON.parse(JSON.stringify(offer));
                return newOffer._id == newHistoryObj.offerId;
            });
            const total = calcHelper.computeTotal(offer.itemPrice, offer.itemDiscount, historyObj.quantity);
            return {
                lat: store.lat,
                lng: store.lng,
                address: store.address,
                zipcode: store.zipcode,
                company: store.company,
                itemName: offer.itemName,
                itemPrice: offer.itemPrice,
                itemDiscount: offer.itemDiscount,
                quantity: historyObj.quantity,
                total: total,
                created: historyObj.created
            };
        }));

        res.status(200).send({message: 'Fetched user history', userHistory});
    });
};
