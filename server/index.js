const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const URL = require('./models/url');
const authRouter = require('./routes/authRoutes');
const urlRouter = require('./routes/urlRoutes');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

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

app.listen(9000, console.log('Server is Running on PORT 9000'));
