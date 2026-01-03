const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/check-token', controller.checkToken);

module.exports = router;
