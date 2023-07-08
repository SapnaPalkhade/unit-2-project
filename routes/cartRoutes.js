const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cartController')
const userController = require('../controllers/userController')

/** Route for creating a new cart 

method : post
url : http://localhost:3000/cart
body : 
authorization : required
        type  : bearer token  
*/ 
router.post('/', userController.auth, cartController.createCart)


/** adding  the item to the perticular cart 
 
method : put
url : http://localhost:3000/cart/<cartId>/items
body :  {
        "items": ["64a07c1b25f77538d0959f54","64a07c1b25f77538d0959f52"]
        }
authorization : required
        type  : bearer token  
*/ 

router.put('/:cartId/items', userController.auth, cartController.addItemToCart)

/**
 Show all the items from specific cart (providing cartID)
method : get
url : http://localhost:3000/cart/<cartId>/items
body :  
authorization : required
        type  : bearer token  
 */
router.get('/:cartId/items', userController.auth, cartController.getCartItems);


/** Removing the item from the perticular cart (providing cartID and itemID)

method : delete
url : http://localhost:3000/cart/<cartId>/items/<itemId>
body : 
authorization : required
        type  : bearer token  
 
*/ 
router.delete('/:cartId/items/:itemId', userController.auth, cartController.removeCartItem);

/** showing the total price and quantity for items in a cart

method : get
url : http://localhost:3000/cart/<cartId>/total
body : 
 
*/ 
router.get('/:id/total', cartController.calculateTotalCart)


/** Route for deleting a cart by ID 
 
method : delete
url : http://localhost:3000/cart/<id>
body : 
authorization : required
        type  : bearer token  
 
 */
router.delete('/:id', userController.auth, cartController.deleteCart)




module.exports = router 