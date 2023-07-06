const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => console.log('Testing on PORT 8080'))
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
})

afterAll((done) => done())

describe('Test the users endpoints', () => {
    test('It should create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send({ name: 'Sapana Palkhade', email: 'sapana@example.com', password: 'password' })

        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('Sapana Palkhade')
        expect(response.body.user.email).toEqual('sapana@example.com')
        expect(response.body).toHaveProperty('token')
    })

    test('It should login a user', async () => {
        const user = new User({ name: 'Gunish', email: 'gunish@123.com', password: 'password' })
        await user.save()

        const response = await request(app)
            .post('/users/login')
            .send({ email: 'gunish@123.com', password: 'password' })

        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('Gunish')
        expect(response.body.user.email).toEqual('gunish@123.com')
        expect(response.body).toHaveProperty('token')
    })

    test('It should logout a user ', async () => {
        const user = new User({ name: 'john', email: 'john@example.com', password: 'password' })
        await user.save();
        const token = await user.generateAuthToken()

        const response = await request(app)
            .post('/users/logout')
            .set('Authorization', `Bearer ${token}`)
            .send({ email: 'john@example.com' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'user logout' });
    });


    test('It should update a user', async () => {
        const user = new User({ name: 'Bao', email: 'bao@123.com', password: 'password' })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
            .put(`/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Bao', email: 'bao@123.com' })

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Bao')
        expect(response.body.email).toEqual('bao@123.com')
    })

    test('It should delete a user', async () => {
        const user = new User({ name: 'boku', email: 'boku@123.com', password: 'password' })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
            .delete(`/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('User deleted')
    })


})