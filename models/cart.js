require('dotenv').config()
const {model, Schema } = require('mongoose')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const cartSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    total:{ type: Number, require: true }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
