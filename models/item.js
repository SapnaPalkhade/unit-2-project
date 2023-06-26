const { model, Schema} = require('mongoose')

const itemSchema = new Schema ({
    name: { type: String, require: true },
    description: String,
    category: { type: String, require: true },
    price: { type: Number, require: true},
    quantity: { type: Number,default: 1 },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item 