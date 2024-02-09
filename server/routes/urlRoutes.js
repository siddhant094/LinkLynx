const express = require('express');
const {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleRedirect,
    handleDelete,
    handleUpdate,
} = require('../controllers/urlController');
// const cors = require('cors');
// const {
//     test,
//     registerUser,
//     loginUser,
//     getProfile,
// } = require('../controllers/authController');

const router = express.Router();

router.post('/', handleGenerateNewShortURL);

router.get('/analytics/:shortId', handleGetAnalytics);

router.get('/:shortId', handleRedirect);

router.put('/:shortId', handleUpdate);

router.delete('/:shortId', handleDelete);

// authRouter.use(
//     cors({
//         credentials: true,
//         origin: 'http://localhost:5173',
//     })
// );

// authRouter.get('/', test);
// authRouter.post('/register', registerUser);
// authRouter.post('/login', loginUser);
// authRouter.get('/profile', getProfile);

module.exports = router;
