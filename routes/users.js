const usersController = require('../controllers/users.controller');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', usersController.login);
router.delete('/logout', usersController.logout);

module.exports = router;
