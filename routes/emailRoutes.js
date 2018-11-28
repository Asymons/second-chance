const dbHelper = require('../helpers/dbHelper');
const validator = require('validator');

module.exports = (app) => {

    app.post('/api/emailcapture', async (req, res) => {
        const {email} = req.body;
        if(validator.isEmail(email)){
            const saveEmail = await dbHelper.saveEmail(email);
            res.send({message: saveEmail.message});
        }else{
            res.status(400).send({message: 'Invalid email'});
        }
    });
};
