const Item = require('../models/item')
const User = require('../models/user')
//const Cart = require('../models/cart')


exports.createItem = async (req, res,) => {
    try {
        //req.body.user = req.user._id
        const item = new Item(req.body)
        await item.save()
        res.json(item)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.showItem = async function (req, res) {
    try {
        const item = await Item.findOne({ _id: req.params.id })
        res.json(item)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.showAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateItem = async (req, res) => {
    try {
        const item = await Item.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.json(item)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteItem = async function (req, res) {
    try {
        const item = await Item.findOneAndDelete({ _id: req.params.id })
        res.json({ message: "Item deleted successfully" })
        //res.sendStatus(204)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}