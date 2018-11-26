const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const http = require('http');
const jwt = require('express-jwt');
const cookieSession = require('cookie-session');
const expressValidator = require('express-validator');
const path = require('path');

require('dotenv').config();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => console.log);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(helmet());

const apiLimiter = new rateLimit({
    windowMs: 1000,
    max: 10,
});

app.use(apiLimiter);

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: [process.env.COOKIE_SESSION_KEYS]
}));

app.use(express.static(path.join(__dirname, 'client/build')));

require('./routes/index')(app, db);

app.get('/api/', (req, res) => {
   res.send('Welcome to Second Chance!');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = app;
