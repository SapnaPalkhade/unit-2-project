const { model, Schema} = require('mongoose')


const itemSchema = new Schema ({
    name: { type: String, required: true },
    description: {type:String, required: true},
    category: { type: String, required: true },
    price: { type: Number, required: true},
    quantity: { type: Number,default: 1 }
}, {
    timestamps: true
})

const Item = model('Item', itemSchema)

module.exports = Item 