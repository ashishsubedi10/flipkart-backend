const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    },
    productPictures: [
        { img: { type: String } }
    ],
    reviews: [
        {
            userId: { type: Schema.Types.ObjectId, ref: "User" },
            review: String
        }
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true }
}, { timestamps: true })

module.exports = mongoose.model("product", productSchema)