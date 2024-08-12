const express = require('express');
const transactionController = require('../controllers/transactionCtrl');
const transactionRouter = express.Router();
const isAuthenticated = require('../middlewares/isAuth');

//! add
transactionRouter.post('/api/v1/transaction/create',isAuthenticated,  transactionController.create);

//!list
transactionRouter.get('/api/v1/transaction/lists',isAuthenticated,  transactionController.getFilteredTreansactions);

//!update
transactionRouter.put('/api/v1/transaction/update/:id',isAuthenticated,  transactionController.update);

//!delete
transactionRouter.delete('/api/v1/transaction/delete/:id',isAuthenticated,  transactionController.delete);




module.exports = transactionRouter;