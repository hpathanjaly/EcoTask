const express = require('express');
const mainController = require('../controllers/mainController');
const accountController = require('../controllers/accountController');
const taskController = require('../controllers/taskController');
const investmentController = require('../controllers/investmentController');
const completeController = require('../controllers/completeController');

const router = express.Router();

router.get('/', mainController.index);
router.get('/account', mainController.account);
router.get('/login', mainController.login);
router.get('/register', mainController.register);
router.get('/tasks', mainController.tasks);
router.get('/investments', mainController.investments);
router.get('/drop', mainController.drop);
router.get('/create', mainController.create);
router.get('/logout', accountController.logout);
router.get('/myTasks', taskController.myTasks);
router.get('/task', mainController.task);
router.get('/myInvestments', investmentController.myInvestments);
router.get('/complete', completeController.complete);
router.post('/success', accountController.process);
router.post('/', accountController.authenticate);
router.post('/addTask', taskController.addTask);
router.post('/deleteTask', taskController.deleteTask);
router.post('/addInvestment', investmentController.addInvestment);
router.post('/setTime', completeController.setTime);

module.exports = router;