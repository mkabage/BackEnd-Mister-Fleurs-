var mongoose = require('mongoose');

const connectDb = (url) => {
    return mongoose.connect(url);
};

module.exports = { db: connectDb};