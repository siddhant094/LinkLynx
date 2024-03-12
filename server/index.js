const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const URL = require('./models/url');
const authRouter = require('./routes/authRoutes');
const urlRouter = require('./routes/urlRoutes');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log('Error in database connection', err));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/', authRouter);
app.use('/url', urlRouter);
app.use('/id', urlRouter);

app.get('/id/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: { timestamp: Date.now() },
            },
        }
    );
    res.redirect(entry.redirectURL);
});

app.get('/test', (req, res) => {
    res.send('Route is Working');
});

app.listen(9000, console.log('Server is Running on PORT 9000'));
