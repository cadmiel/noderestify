const { connection, errorHandler } = require('./setup')

const categories = require('./categories')({connection,errorHandler});
const auth = require('./auth')({connection,errorHandler});

module.exports = { 
    category: () => categories,
    auth: () => auth
};