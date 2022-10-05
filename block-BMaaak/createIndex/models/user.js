var mongoose = require(`mongoose`)
var Schema = mongoose.Schema;
var bcrypt = require(`bcrypt`)


var userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, unique: true},
    email: {type: String, unique:true},
    address: {
        city: String,
        State: String,
        Country: String,
        pin: Number
    }
})

userSchema.index({"address.country": 1, "address.state": 1})


module.exports = mongoose.model(`User`, userSchema)