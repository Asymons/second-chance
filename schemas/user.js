const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: {
        type: String,
        required: true,
        unique: true,
        validate: { validator: () => true, message: 'This is an invalid google id' }
    },
    email: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    loggedIn: {
        type: Boolean
    },
    created: {
        type: Date
    },
    stores: {
        type: [
            {
                storeId: String,
            }
        ]
    },
    cart: {
        type: [
            {
                storeId: String,
                offerId: String,
                quantity: Number,
            }
        ]
    },
    history: {
        type: [
            {
                storeId: String,
                offerId: String,
                quantity: Number,
                created: Date,
            }
        ]
    },
    settings: {
        type: {
            radius: Number,
            lat: Number,
            lng: Number,
        }
    },
    totalCart: {
        type: Number
    },
    totalPurchases: {
        type: Number
    },
    totalSpent: {
        type: Number
    },
    totalSaved: {
        type: Number
    },
    role: {
        type: String
    },
});

module.exports = mongoose.model('user', userSchema);

