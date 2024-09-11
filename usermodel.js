const mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017/abc`)

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    username: String,
})

const user = mongoose.model('user', userSchema)

module.exports = user