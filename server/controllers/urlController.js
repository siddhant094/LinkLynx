const shortid = require('shortid');
const URL = require('../models/url');
const User = require('../models/user');
const mongoose = require('mongoose');

handleGenerateNewShortURL = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' });
    const shortID = shortid();

    const createdLink = await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        creator: body.userId,
    });

    let user;

    try {
        user = await User.findById(body.userId);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'creating user failed' });
    }

    if (!user) {
        return res
            .status(400)
            .json({ error: 'Could not find user for provided id.' });
    }
    // console.log(user);

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdLink.save({ session: sess });
        user.links.push(createdLink);
        await user.save({ session: sess });
        await sess.commitTransaction();
        sess.endSession();
    } catch (err) {
        return res.status(400).json({ error: 'creating user failed', err });
    }
    return res.json({ id: shortID });
};

handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
};

handleUpdate = async (req, res) => {
    const shortId = req.params.shortId;
    const url = req.body;
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                redirectURL: url.newLink,
            }
        );
        if (entry) {
            console.log('Entry updated successfully:', entry);
        } else {
            console.log('No entry found for the specified shortId:', shortId);
        }
    } catch (error) {
        console.log(error);
        res.send({ error: 'Error Occoured' });
    }
    res.json('Success');
};

handleRedirect = async (req, res) => {
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
};

handleDelete = async (req, res) => {
    const shortId = req.params.shortId;
    console.log(shortId);
    let link;
    try {
        link = await URL.findOne({ shortId }).populate('creator');
    } catch (error) {
        console.log('error');
    }
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await link.deleteOne({ session: sess });
        await link.creator.links.pull(link);
        await link.creator.save({ session: sess });
        await sess.commitTransaction();
        sess.endSession();
    } catch (err) {
        res.status(400).json({
            error: 'Something went wrong, could not delete place.',
        });
        console.log(err);
    }
    // res.json('Successfully Deleted');
};

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleRedirect,
    handleDelete,
    handleUpdate,
};
