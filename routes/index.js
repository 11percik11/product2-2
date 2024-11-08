const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers');



router.post('/users/register', UserController.register);
router.delete('/delete/:id', UserController.deleteUser);
router.get("/current", UserController.current);
router.get("/users/:id", UserController.getUserById);
router.patch("/users/:id", UserController.updateUser);

module.exports = router;