const express = require('express');
const mainController = require('../controllers/mainController');
const accountController = require('../controllers/accountController');
const taskController = require('../controllers/taskController');
const investmentController = require('../controllers/investmentController');
const taskCompleteController = require('../controllers/taskCompleteController');
const investmentCompleteController = require('../controllers/investmentCompleteController');

const router = express.Router();

// main routes
router.get('/', mainController.index);
router.get('/account', mainController.account);
router.get('/login', mainController.login);
router.get('/register', mainController.register);
router.get('/tasks', mainController.tasks);
router.get('/investments', mainController.investments);
router.get('/drop', mainController.drop);
router.get('/create', mainController.create);

// account routes
router.get('/logout', accountController.logout);
router.post('/success', accountController.process);
router.post('/', accountController.authenticate);

// task routes
router.get('/myTasks', taskController.myTasks);
router.get('/task', taskController.task);
router.post('/addTask', taskController.addTask);
router.post('/deleteTask', taskController.deleteTask);

// investment routes
router.get('/myInvestments', investmentController.myInvestments);
router.get('/investment', investmentController.investment)
router.post('/addInvestment', investmentController.addInvestment);
router.post('/deleteInvestment', investmentController.deleteInvestment);

// task complete routes
router.get('/completeTask', taskCompleteController.complete);
router.post('/setTime', taskCompleteController.setTime);

// investment complete routes
router.get('/completeInvestment', investmentCompleteController.complete);
router.post('/setBudget', investmentCompleteController.setBudget);
router.post('/updateBudget', investmentCompleteController.updateBudget);

module.exports = router;