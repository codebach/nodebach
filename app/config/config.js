require('dotenv').config();

module.exports = {
    'secret': process.env.API_SECRET,
    'database': process.env.DATABASE_URL,
    'env': process.env.NODE_ENV,
    'port': process.env.PORT
};