const authHelper = require('../helpers/authHelper');
const dbHelper = require('../helpers/dbHelper');

module.exports = (app) => {

    app.get('/api/orders', authHelper.isUserAuthorized, async (req, res) => {
        const userId = req.decoded;
        const user = await dbHelper.getUser(userId);
        const orders = [];

        const storeDataPromises = user.stores.map(async (storeObj) => {
           const {_id} = storeObj;
           const store = await dbHelper.getStore(_id);

           store.orders.forEach((order) => {
               const offer = store.offers.find((offer) => {
                   return order.offerId == offer._id;
               });

               const tax = 1.13;
               const total = Math.ceil(((offer.itemPrice - offer.itemDiscount) * order.quantity) * tax);

               if(offer !== undefined){
                   orders.push({
                       lat: store.lat,
                       lng: store.lng,
                       address: store.address,
                       zipcode: store.zipcode,
                       company: store.company,
                       itemName: offer.itemName,
                       itemPrice: offer.itemPrice,
                       itemDiscount: offer.itemDiscount,
                       total: total,
                       created: order.created,
                       quantity: order.quantity,
                       orderedBy: order.orderedBy,
                   })
               }
           });
        });
        await Promise.all(storeDataPromises);
        res.send({message: 'Got store data for orders', orders});
    });

};
