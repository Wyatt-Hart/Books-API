require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

console.log('[Mongoose] running at ' + process.env.MONGO_URI)

module.exports.Books = require('./books')