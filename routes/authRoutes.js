const dbHelper = require('../helpers/dbHelper');
const jwt = require('jsonwebtoken');

module.exports = (app) => {

    app.get('/api/token', async (req, res) => {
        const {id, profileObj} = req.query;
        const profileJson = JSON.parse(profileObj);
        const googleInfo = {
            googleId: id,
            firstName: profileJson.givenName,
            lastName: profileJson.familyName,
            email: profileJson.email,
        };
        const token = jwt.sign({ id }, process.env.JWT_SECRET);
        await dbHelper.addUser({...googleInfo});
        res.send({token});
    });

};
