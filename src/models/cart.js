const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cartItems: [
        {
            product: { type: Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, default: 1 },
            price: { type: Number, required: true }
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model("Cart", cartSchema)