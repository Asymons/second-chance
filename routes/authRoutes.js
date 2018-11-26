const dbHelper = require('../helpers/dbHelper');
const jwt = require('jsonwebtoken');

module.exports = (app) => {

    app.get('/api/token', async (req, res) => {
        const {id} = req.query;
        const token = jwt.sign({ id }, process.env.JWT_SECRET);
        await dbHelper.addUser({googleId: id});
        res.send({token});
    });

};
