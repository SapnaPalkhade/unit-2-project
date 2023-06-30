const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')
const userController = require('../controllers/userController')

// // Route for creating a new item
 router.post('/', itemController.createItem)

// // Route for retrieving a specific item by ID
 router.get('/:id', itemController.showItem)

// // Route for retrieving all items
 router.get('/', itemController.showAllItems)

// // Route for updating an item by ID
 router.put('/:id', itemController.updateItem)

// // Route for deleting an item by ID
 router.delete('/:id', itemController.deleteItem)

 module.exports = router 

