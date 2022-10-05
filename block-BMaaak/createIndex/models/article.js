var mongoose = require(`mongoose`)
var Schema = mongoose.Schema;
var bcrypt = require(`bcrypt`)


var articleSchema = new Schema({
    title:String,
    description: String,
    tags: [{type: String}]
})

articleSchema.index({tags: 1})
articleSchema.index({title: "text", description: "text"})

articleSchema.index({"address.country": 1, "address.state": 1})


module.exports = mongoose.model(`Article`, articleSchema)