const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../helpers/auth');

const test = (req, res) => {
    res.json('Hello');
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No user found',
            });
        }
        const match = await comparePassword(password, user.password);
        if (match) {
            // res.json('passwords match');
            jwt.sign(
                { email: user.email, id: user._id, name: user.name },
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(user);
                }
            );
        } else res.json({ error: 'Incorrect Credentials' });
    } catch (error) {
        console.log(error);
        // toa;
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({
                error: 'name is required',
            });
        }
        const exists = await User.findOne({ email });
        if (exists) {
            return res.json({
                error: 'Email is taken, please Login',
            });
        }
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        return res.json(user);
    } catch (error) {
        console.log(error);
    }
};

const getProfile = async (req, res) => {
    const { token } = await req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    } else {
        res.json('error in profile route');
    }
};

const getInfo = async (req, res) => {
    const { id } = req.body;
    // console.log(req.body);
    let user;
    try {
        user = await User.findOne({ _id: id }).populate('links');
        // console.log(user);
    } catch (error) {
        console.log({ error: error });
        res.send('error');
    }
    // console.log('DONE');
    res.json(user);
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    getInfo,
};
