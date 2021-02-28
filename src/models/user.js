const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
    ,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {
        type: String
    },
    profilePicture: {
        type: String
    }

}, { timestamps: true })

// userSchema.virtual('password').set(
//     function (password) {
//         this.hashed_password = bcrypt.hashSync(password, 10);
//     }
// )
userSchema.virtual('fullName').get(
    function () {
        return `${this.firstName} ${this.lastName}`
    })
userSchema.methods = {
    authenticate: async function (password) {
        return await bcrypt.compare(password, this.hashed_password)
    }
}



module.exports = mongoose.model('User', userSchema)