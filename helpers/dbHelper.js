const User = require('../schemas/user');
const Store = require('../schemas/store');
const calcHelper = require('./calcHelper');

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
    (new Store(storeInfo)).save();
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
};
