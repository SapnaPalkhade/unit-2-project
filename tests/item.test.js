const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(7070, () => console.log('Testing on PORT 7070'))
const Items = require('../models/item')
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

afterAll((done) => done())

describe('Test the items endpoints', () => {
    test('It should create a new item', async () => {
        const response = await request(app)
            .post('/items')
            .send({ name: 'moisturizer', description: 'skin-conditoner', category: 'skinCare-product', price: 70, quantity: 3 })

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('moisturizer')
        expect(response.body.description).toEqual('skin-conditoner')
        expect(response.body.category).toEqual('skinCare-product')
        expect(response.body.price).toEqual(70)
        expect(response.body.quantity).toEqual(3)

    })

    test('It should display an item', async () => {
        const item = new Items({ name: 'Shampoo', description: 'hair-product', category: 'hair-care', price: 40, quantity: 2 })
        await item.save()
        const response = await request(app)
            .get(`/items/${item._id}`)

        expect(response.body.name).toEqual('Shampoo')
        expect(response.body.description).toEqual('hair-product')
        expect(response.body.category).toEqual('hair-care')
        expect(response.body.price).toEqual(40)
        expect(response.body.quantity).toEqual(2)
    })

    test('It should display an item', async () => {
        const item1 = new Items({ name: 'Conditioner', description: 'hair-product', category: 'hair-care', price: 80, quantity: 5 })
        await item1.save()
        const item2 = new Items({ name: 'Hair-gel', description: 'hair-product', category: 'hair-care', price: 100, quantity: 1 })
        await item2.save()
        const response = await request(app)
            .get('/items')

        expect(response.statusCode).toBe(200)
        expect.objectContaining(item1)
        expect.objectContaining(item2)
    })


    test('It should update an item', async () => {
        const item = new Items({ name: 'Hydrating-serum', description: 'Repairing-Essence', category: 'skin-care', price: 90, quantity: 2 })
        await item.save()
        const response = await request(app)
            .put(`/items/${item._id}`)
            .send({ name: 'Face-Mist', description: 'Rejuvenates & Clarifies', category: 'skin-care', price: 70 })
        expect(response.body.name).toEqual('Face-Mist')
        expect(response.body.description).toEqual('Rejuvenates & Clarifies')
        expect(response.body.price).toEqual(70)


    })

    test('It should delete an item', async () => {
        const item = new Items({ name: 'Cleanser', description: 'Face Wash ', category: 'skin-care', price: 20 })
        await item.save()
        const response = await request(app)
            .delete(`/items/${item._id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('Item deleted successfully')

    })

})