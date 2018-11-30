const User = require('../schemas/user');
const Store = require('../schemas/store');
const Email = require('../schemas/email');
const calcHelper = require('./calcHelper');
const cloudinary = require('cloudinary');

const getUser = async (googleId) => {
    const user = await User.findOne({googleId});
    return user;
};

const getStore = async (storeId) => {
    const store = await Store.findOne({_id: storeId});
    return store;
};

const getStoresInRange = async (userLocation, userRadius) => {
    const stores = await Store.find({});
    const storesInRange =
        stores.filter((store) => calcHelper.calcCrow(userLocation, {lat: store.lat, lng: store.lng}) <= userRadius);
    return storesInRange;
};

const addUser = (userInfo) => {
    User.count({...userInfo}, (err, count) => {
        if(count === 0){
            const newUser = new User({
                ...userInfo,
                loggedIn: false,
                created: new Date(),
                cart: [],
                stores: [],
                totalCart: 0,
                totalPurchases: 0,
                totalSpent: 0,
                totalSaved: 0,
                history: [],
                settings: {
                    radius: 5,
                    lat: 0,
                    lng: 0,
                },
                role: 'USER',
            });
            newUser.save((err) => {
                if(err) console.log(err);
            });
        }
    });
};

const getCart = async (userId) => {
    const user = await User.find({_id: userId});
    return user.cart;
};

const addToCart = async (userId, cartObj) => {
    const user = await User.find({_id: userId});
    user.set({cart: [...user.cart, cartObj]});
    user.save();
};

const removeFromCart = async (userId, cartObj) => {
    const user = await User.find({_id: userId});
    user.set({cart: user.cart.filter((element) => element !== cartObj)});
    user.save();
};

const clearCart = async (userId) => {
    const user = await User.find({_id: userId});
    user.set({cart: []});
    user.save();
};

const setUserLoginState = (userInfo, loggedIn) => {
    User.findOne({...userInfo}, (err, dbUserInfo) => {
        if(dbUserInfo){
            dbUserInfo.loggedIn = loggedIn;
            dbUserInfo.save((err) => {
                if(err) console.log(err);
            })
        }else{
            console.log(err);
        }
    })
};

const addHistory = async (googleId, newOrder) => {
    const user = await User.findOne({googleId});
    user.history.push({...newOrder});
    user.save();
};

const getHistoryFromUser = async (googleId) => {
    const user = await getUser(googleId);
    return user.history;
};

const getSettingsFromUser = async (googleId) => {
    const user = await getUser(googleId);
    return user.settings;
};

const saveSettingsFromUser = async (googleId, settings) => {
    const user = await getUser(googleId);
    user.settings = settings;
    user.save();
};

const addOffer = async (storeId, offer) => {
  const store = await getStore(storeId);
  store.offers.push(offer);
  store.save();
};

const deleteOffer = async (storeId, offerId) => {
    const store = await getStore(storeId);
    store.offers = store.offers.filter((element) => element.offerId !== offerId);
    store.save();
};

const addToStore = async (googleId, newOrder, orderedBy) => {
    const store = await getStore(newOrder.storeId);
    const {offerId, quantity, created} = newOrder;
    store.orders.push({
        offerId,
        quantity,
        created,
        orderedBy,
    });
    store.save();
};

const getOffer = async (storeId, offerId) => {
    const store = await getStore(storeId);
    const order = store.offers.find((element) => offerId === element._id);
    return order;
};

const getAllStores = async () => {
    const stores = Store.find({});
    return stores;
};

const saveStore = async (storeInfo) => {
    (new Store({...storeInfo, public_id: '', imageUrl: 'https://res.cloudinary.com/second-chance/image/upload/v1543371314/demo/no-image-500.png'})).save();
};

const setStoreImage = async (storeId, imageUrl, publicId) => {
    const store = await getStore(storeId);
    if(store.publicId !== ''){
        cloudinary.v2.uploader.destroy(store.publicId);
    }
    store.imageUrl = imageUrl;
    store.publicId = publicId;
    store.save();
};

const getAllEmail = async () => {
    return await Email.find({});
};

const doesEmailAddressExist = async (email) => {
    return (await Email.find({email})).length > 0;
};

const saveEmail = async (email) => {
    const emails = await getAllEmail();
    if(emails.length <= 1000 && !(await doesEmailAddressExist(email))){
        (new Email({email})).save();
        return {message: 'Saved email'};
    }else{
        return {message: 'Could not save email, too many saved or email exists'};
    }
};

module.exports = {
    addUser,
    getUser,
    addToCart,
    removeFromCart,
    clearCart,
    getCart,
    setUserLoginState,
    getStoresInRange,
    addHistory,
    getHistoryFromUser,
    getStore,
    getSettingsFromUser,
    saveSettingsFromUser,
    addOffer,
    deleteOffer,
    addToStore,
    getOffer,
    getAllStores,
    saveStore,
    setStoreImage,
    saveEmail
};
