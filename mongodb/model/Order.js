const { default: mongoose } = require("mongoose");

const oderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    product: {
        type: String,
        require: true,
    },
    amount: {
        type: Number,
        require: true,
    },
    desc:{
        type:String,
    }
}, { timestamps: true })

name = "avinash"
// desc = "skfjbjksjdjb vsm v svkhsdv sdkv ks dvk sdkv ksd vhs vkh ask"
oderSchema.index({desc:"text"})

/*

operators
sytext that are used to do some special work
$ dollersign

$eq = equal
gt = greater then
lt 
lte
gte
$or
$and
$text = text search
$search = search single term inside $text

{age : {$gt: 5 }}

*/


module.exports = mongoose.model("Order", oderSchema)




