const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

/** Route for creating a new user
 
method : post
url : http://localhost:3000/users
body : 
        {
            "name": "sapana",
            "email": "sapana@123.com",
            "password": "password"
        }
authorization : 
*/  
router.post('/', userController.createUser)

/** Route for user login into CartShopee 

method : post
url : http://localhost:3000/users/login
body : 
        {
   
            "email": "sapana@123.com",
            "password": "password"

        }
authorization : 
*/ 
router.post('/login',userController.loginUser)

/** Route for user to logout from the CartShopee

method : post
url : http://localhost:3000/users/logout
body : 
authorization : required
        type  : bearer token
*/ 
router.post('/logout', userController.auth, userController.logoutUser)

/** Route for updating a user by ID, with authentication middleware

method : put
url : http://localhost:3000/users/<id>
body :
        {
            "email": "gun7@77"
        }
authorization : required
        type  : bearer token
*/
router.put('/:id', userController.auth, userController.updateUser)


/** Route for deleting a user by ID, with authentication middleware

method : delete
url : http://localhost:3000/users/<id>
body :
authorization : required
        type  : bearer token
*/ 
router.delete('/:id', userController.auth, userController.deleteUser)

module.exports = router