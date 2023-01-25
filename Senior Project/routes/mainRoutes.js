const express = require('express');
const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', mainController.index);
router.get('/account', mainController.account);
router.get('/login', mainController.login);
router.get('/register', mainController.register);
router.post('/success', mainController.process)




module.exports = router;