const authRoutes = require('./authRoutes');
const checkoutRoutes = require('./checkoutRoutes');
const offerRoutes = require('./offerRoutes');
const historyRoutes = require('./historyRoutes');
const settingsRoutes = require('./settingsRoutes');
const orderRoutes = require('./orderRoutes');

module.exports = (app, db) => {
    authRoutes(app);
    checkoutRoutes(app);
    offerRoutes(app);
    historyRoutes(app);
    settingsRoutes(app);
    orderRoutes(app);
};
