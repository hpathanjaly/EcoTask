const express = require('express');
const mainController = require('../controllers/mainController');
const accountController = require('../controllers/accountController');

const router = express.Router();

router.get('/', mainController.index);
router.get('/account', mainController.account);
router.get('/login', mainController.login);
router.get('/register', mainController.register);
router.post('/success', accountController.process);

module.exports = router;