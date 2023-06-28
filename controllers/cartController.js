const Item = require('../models/item')
const User = require('../models/user')
const Cart = require('../models/cart')

exports.create = async ( req, res) => {
    try {
        req.body.user = req.user._id
        const cart = await Cart.create(req.body)
        req.user.cart = {_id: cart._id}
        await req.user.save()
        res.json(cart)
    } catch (error) {
        res.status(400).json({ message: error.message}) 
    }
}

exports.showCart = async(req, res) => {
    try {
        const cart = await Cart.findOne({ _id: req.params.id })
        res.json(cart)
    } catch (error) {
        res.status(400).json({ message: error.message})  
    }
}

exports.updateCart = async(req,res) => {
    try {
        const cart = await Cart.findOneAndUpdate({ _id: req.param.id}, req.body, {new: true})
        res.json(item)
    } catch (error) {
       res.status(400).json({ message: Error.message}) 
    }
}

exports.calculateTotalCart = async(req, res) => {
    let total = 0
    try {
        const calCart = await Cart.find({ _id: req.params.id})
        for(let item of calCart) {
            total += item.price 
        }
        await calCart.save()
        res.json(total)
    } catch (error) {
        res.status(400).json({ message: Error.message})  
    }
    
}

exports.deleteCart = async(req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ _id: req.params.id })
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({ message: Error.message}) 
    }
}