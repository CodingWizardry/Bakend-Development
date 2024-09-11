const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/test-app1')

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    imageUrl: String,
})

module.exports = mongoose.model('user', userSchema)