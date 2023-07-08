const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')
const cartController = require('../controllers/cartController')
const userController = require('../controllers/userController')

/** Route for creating a new item

method : post
url : http://localhost:3000/items
body : 
      {
        "name": "Moisriture-temp",
        "description": "skin-conditoner",
        "category": "skinCare-product",
        "price": 70,
        "quantity": 3
    }
*/ 

 router.post('/', itemController.createItem)

/** Route for retrieving a specific item by ID 
 
method : get
url : http://localhost:3000/items/<itemId>
body : 
      
*/ 
 router.get('/:id', itemController.showItem)

/** Route for retrieving all items

method : get
url : http://localhost:3000/items
body : 

*/
 router.get('/', itemController.showAllItems)

/** Route for updating an item by ID

method : put
url : http://localhost:3000/items/<itemId>
body : 
    {
        "description": "medicated-body-soap"
    }
*/ 
 router.put('/:id', itemController.updateItem)

/** Route for deleting an item by ID
 
method : delete
url : http://localhost:3000/items/<itemId>
body : 

 */
 router.delete('/:id', itemController.deleteItem)

 module.exports = router 

