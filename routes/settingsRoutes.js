const authHelper = require('../helpers/authHelper');
const dbHelper = require('../helpers/dbHelper');
const validator = require('validator');

const settingsValidator = (req, res, next) => {
    const { settings } = req.body;
    if (!(validator.isInt(settings.radius + '') &&
        validator.isNumeric(settings.lat + '') &&
        validator.isNumeric(settings.lng + ''))) {
        return res.status(400).send({ message: 'Invalid input' });
    } else {
        next();
    }
}

module.exports = (app) => {

    app.get('/api/user', authHelper.isUserAuthorized, async (req, res) => {
        const userId = req.decoded;
        const user = await dbHelper.getUser(userId);
        res.send({ message: 'Fetched user', user });
    });

    app.get('/api/settings', authHelper.isUserAuthorized, async (req, res) => {
        const userId = req.decoded;
        const settings = await dbHelper.getSettingsFromUser(userId);
        res.status(200).send({ message: 'Fetched user settings', settings });
    });

    app.post('/api/settings', settingsValidator, authHelper.isUserAuthorized, async (req, res) => {
        const userId = req.decoded;
        const newSettings = req.body.settings;
        const settings = await dbHelper.saveSettingsFromUser(userId, newSettings);
        res.status(200).send({ message: 'Saved user settings', settings });
    });
};
