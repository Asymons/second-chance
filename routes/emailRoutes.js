const dbHelper = require('../helpers/dbHelper');
const emailHelper = require('../helpers/emailHelper');
const validator = require('validator');

module.exports = (app) => {

    app.post('/api/emailcapture', async (req, res) => {
        const {email} = req.body;
        if(validator.isEmail(email)){
            const saveEmail = await dbHelper.saveEmail(email);
            emailHelper.sendEmail(`A new user signed up to the mailing list: ${email}`);
            res.send({message: saveEmail.message});
        }else{
            res.status(400).send({message: 'Invalid email'});
        }
    });
};
