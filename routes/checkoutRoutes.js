const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);
const authHelper = require('../helpers/authHelper');
const dbHelper = require('../helpers/dbHelper');
const calcHelper = require('../helpers/calcHelper');

const paymentValidator = (req, res, next) => {
    next();
}

module.exports = (app) => {
    app.get('/api/createCustomer', authHelper.isUserAuthorized, async (req, res) => {
        const userId = req.decoded;
        const user = await dbHelper.getUser(userId);
        if (user.role !== 'ADMIN') {
            res.send({ message: 'Unauthorized' });
        } else {
            stripe.customers.create(
                { email: 'customer@example.com' },
                (err, customer) => {
                    console.log('Err', err);
                    res.send(customer);
                }
            );
        }
    });
    app.post('/api/doPayment/',
        paymentValidator,
        authHelper.isUserAuthorized,
        async (req, res) => {

        const { tokenId, newOrder } = req.body;
        const user = await dbHelper.getUser(req.decoded);
        const offer = await dbHelper.getOffer(newOrder.storeId, newOrder.offerId);
        const total = calcHelper.computeTotal(offer.itemPrice, offer.itemDiscount, newOrder.quantity);

        return stripe.customers.create({
            email: user.email,
            source: tokenId
        })
            .then(customer => {
                stripe.charges.create({
                    amount: total,
                    currency: 'CAD',
                    customer: customer.id,
                    source: customer.default_source.id,
                    description: `Order payment for offer ${newOrder.offerId} at store ${newOrder.storeId}`,
                })
            })
            .then(async (result) => {
                await dbHelper.addHistory(req.decoded, newOrder);
                await dbHelper.addToStore(req.decoded, newOrder, user.email);
                res.status(200).json(result);
            })
    });
};
