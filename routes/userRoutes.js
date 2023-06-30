const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// Route for creating a new user
router.post('/', userController.createUser)

// Route for user login
router.post('/login',userController.auth, userController.loginUser)

router.post('/logout',  userController.logoutUser)

// Route for updating a user by ID, with authentication middleware
router.put('/:id', userController.auth, userController.updateUser)

// Route for deleting a user by ID, with authentication middleware
router.delete('/:id', userController.auth, userController.deleteUser)

module.exports = router