const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    lng: String,
    lat: String,
    address: String,
    zipcode: String,
    company: String,
    dateCreated: Date,
    offers: [
        {
            offerId: String,
            itemName: String,
            itemPrice: Number,
            itemDiscount: Number,
        }
    ],
    orders: [
        {
            offerId: String,
            quantity: String,
            created: Date,
            orderedBy: String,
        }
    ],
    totalEarned: Number,
    totalSales: Number,
    totalLikes: Number,
});

module.exports = mongoose.model('store', storeSchema);



