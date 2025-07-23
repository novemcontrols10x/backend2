const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: [true, "please enter unique email"],
        unique: true
    },
    age: {
        type: Number
    },
    address: {
        city: String,
        state: String
    }
}, { timestamps: true })


userSchema.index({ name: 1 }) // single field

// compound index
//  unique index 
// text index

userSchema.index({ name: 1, email: 1 }) // compound index
// userSchema.index({ email: 1, name: 1 }) // compound index
// 

// userSchema.find({name:name, email:email})








module.exports = mongoose.model("User", userSchema)
