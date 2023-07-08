require('dotenv').config()
const express = require('express')
// const mongoose = require('mongoose')
const morgan = require('morgan')
const userRoutes = require('./routes/userRoutes')
const itemRoutes = require('./routes/itemRoutes')
const cartRoutes = require('./routes/cartRoutes')

const app = express()

app.use(express.json())
app.use(morgan('combined'))

app.use('/items', itemRoutes)
app.use('/users', userRoutes)
app.use('/cart', cartRoutes)

module.exports = app