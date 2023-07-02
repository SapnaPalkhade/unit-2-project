const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cartController')
const userController = require('../controllers/userController')

 // Route for creating a new cart
router.post('/',userController.auth, cartController.createCart)

// adding  the item to the perticular cart
router.put('/:cartId/items',userController.auth, cartController.addItemToCart)


// Show all the items from specific cart (providing cartID)
router.get('/:cartId/items', userController.auth, cartController.getCartItems);


// Removing the item from the perticular cart (providing cartID and itemID)
router.delete('/:cartId/items/:itemId', userController.auth, cartController.removeCartItem);

router.get('/:id/total', cartController.calculateTotalCart)


// Route for deleting a cart by ID
router.delete('/:id', userController.auth, cartController.deleteCart)




 module.exports = router 