const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(6060, () => console.log('Testing on PORT 6060'))
const Item = require('../models/item')
const Cart = require('../models/cart')
const User = require('../models/user')
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
});

afterAll((done) => done())

describe('Test the cart endpoints', () => {
    test('It should create a new cart', async () => {
        const user = new User({ name: 'sapana', email: 'sapana@123.com', password: 'password' });
        await user.save()

        const token = await user.generateAuthToken()
        const response = await request(app)
            .post('/cart')
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)

    })

    test('It should add an item to the cart', async () => {
        const user = new User({ name: 'sapanaa', email: 'sapanaa@123.com', password: 'password' });
        await user.save()
        const cart = new Cart({ user: user._id })
        await cart.save()
        const item = new Item({ name: 'Shampoo', description: 'hair-product', category: 'hair-care', price: 40, quantity: 2 })
        await item.save()

        const token = await user.generateAuthToken()
        const response = await request(app)
            .put(`/cart/${cart._id}/items`)
            .set('Authorization', `Bearer ${token}`)
            .send({ items: [item._id] })
            .expect(200);
        const updatedCart = await Cart.findById(cart._id);
        expect(updatedCart.items.length).toBe(1);
        expect(updatedCart.items[0].toString()).toBe(item._id.toString());

    })



    test('It should dsipaly the items in the cart', async () => {
        const user = new User({ name: 'Bao', email: 'bao@123.com', password: 'password' });
        await user.save()
        const cart = new Cart({ user: user._id })
        await cart.save()

        const token = await user.generateAuthToken()
        const response = await request(app)
            .get(`/cart/${cart._id}/items`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)

    })



    test('It should remove the items from the cart', async () => {
        const user = new User({ name: 'Gunish', email: 'Gunish@123.com', password: 'password' });
        await user.save()

        const cart = new Cart({ user: user._id })
        await cart.save()

        const item = new Item({ name: 'Whey-protein', description: 'Protein Powder', category: 'sport-nutrition', price: 100, quantity: 4 })
        await item.save()

        cart.items.push(item)
        await cart.save() // this needs to be always there otherwise test case would fail

        const token = await user.generateAuthToken()
        const response = await request(app)
            .delete(`/cart/${cart._id}/items/${item._id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        // Check if the item has been removed from the cart
        const updatedCart = await Cart.findById(cart._id);
        const itemIndex = updatedCart.items.findIndex(itemId => itemId.toString() === item._id.toString());
        expect(itemIndex).toBe(-1);

    })


    test('It should calculate the total price and total items in the cart', async () => {
        // Create a user, cart, and items for testing
        const user = new User({ name: 'Andy', email: 'Andy@example.com', password: 'password' })
        await user.save()

        const cart = new Cart({ user: user._id });
        await cart.save();

        const item1 = new Item({ name: 'Shirt', description: 'Clothing item', category: 'Apparel', price: 200, quantity: 1 })
        const item2 = new Item({ name: 'Pants', description: 'Clothing item', category: 'Apparel', price: 300, quantity: 2 })
        await item1.save()
        await item2.save()

        cart.items.push(item1, item2)
        await cart.save()

        // Perform the request to calculate the total cart
        const response = await request(app)
            .get(`/cart/${cart._id}/total`)
        expect(response.statusCode).toBe(200)

        // Check the response body for total price and total items
        const { totalPrice, totalItems } = response.body
        expect(totalPrice).toBe(800) // Expected total price: 200 + 300*2 = 800
        expect(totalItems).toBe(3) // Expected total items: 1 + 2 = 3
    })


    test('It should delete the cart', async () => {
        const user = new User({ name: 'Nancy', email: 'Nancy@123.com', password: 'password' });
        await user.save()
        const cart = new Cart({ user: user._id })
        await cart.save()

        const token = await user.generateAuthToken()
        const response = await request(app)
            .delete(`/cart/${cart._id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)


        const deletedCart = await Cart.findById(cart._id);
        expect(deletedCart).toBeNull();

    })
})
