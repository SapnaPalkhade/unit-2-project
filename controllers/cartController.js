const Item = require('../models/item')
const User = require('../models/user')
const Cart = require('../models/cart')


/** Controller for Creating a New Cart Route */

exports.createCart = async (req, res) => {
    try {
        req.body.user = req.user._id
        const cart = await Cart.create(req.body)
        req.user.cart = { _id: cart._id }
        await req.user.save()
        res.json(cart)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

/** Controller for adding items to a cart Route */

exports.addItemToCart = async (req, res) => {

    try {

        const itemId = req.body.items
        const cartId = req.params.cartId

        const item = await Item.findOne({ _id: itemId })
        if (!item) {
            return res.status(404).json({ message: 'Item not found' })
        }

        const cart = await Cart.findOne({ _id: cartId })
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }

        cart.items.push(item);
        await cart.save()
        res.json({ message: 'Item(s) added to cart successfully' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

/** Controller for showing cart items Route */

exports.getCartItems = async (req, res) => {
    try {
        const cartId = req.params.cartId;

        const cart = await Cart.findOne({ _id: cartId }).populate('items');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.json(cart.items);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

/** Controller for removing item(s) from a cart Route */

exports.removeCartItem = async (req, res) => {
    try {
        console.log(req.params.cartId)
        const cartId = req.params.cartId
        const itemId = req.params.itemId


        const cart = await Cart.findOne({ _id: cartId })
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }

        // Find the index of the item in the items array
        const itemIndex = cart.items.findIndex(item => item.toString() === itemId)
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' })
        }

        // Remove the item from the items array
        cart.items.splice(itemIndex, 1)
        await cart.save()

        res.json({ message: 'Item removed from cart successfully' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

/** Controller for calucating total price for the items in a cart Route */

exports.calculateTotalCart = async (req, res) => {
    try {
        const cartId = req.params.id

        const cart = await Cart.findOne({ _id: cartId }).populate('items')
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }

        let totalPrice = 0
        let totalItems = 0

        for (const item of cart.items) {
            totalPrice += item.price * item.quantity;
            totalItems += item.quantity;
        }
        res.json({ totalPrice, totalItems })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

/** Controller for deleting cart Route */

exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ _id: req.params.id })
        res.json({ message: 'Cart deleted' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}