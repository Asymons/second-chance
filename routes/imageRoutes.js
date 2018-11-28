const authHelper = require('../helpers/authHelper');
const dbHelper = require('../helpers/dbHelper');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });

module.exports = (app) => {

    app.post('/api/images',
        authHelper.isUserAuthorized,
        parser.single('file'),
        async (req, res) => {
            const userId = req.decoded;
            const user = await dbHelper.getUser(userId);
            if(user.role === 'OWNER'){
                console.log(req.file); // to see what is returned to you
                const image = {};
                image.url = req.file.url;
                image.id = req.file.public_id;
                await dbHelper.setStoreImage(user.stores[0]._id, image.url, image.id);
                res.send({message: 'Image saved'});
            }else{
                res.send({message: 'No permission'});
            }
        }
    );

};
