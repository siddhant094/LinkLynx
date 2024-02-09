const express = require('express');
const cors = require('cors');
const {
    test,
    registerUser,
    loginUser,
    getProfile,
    getInfo,
} = require('../controllers/authController');

const authRouter = express.Router();

authRouter.use(
    cors({
        credentials: true,
        origin: process.env.ORIGIN,
    })
);

authRouter.get('/', test);
authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/profile', getProfile);
authRouter.post('/info', getInfo);

module.exports = authRouter;
