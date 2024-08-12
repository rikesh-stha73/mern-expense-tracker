const express = require('express');
const categoryController = require('../controllers/categoryCtrl');
const categoryRouter = express.Router();
const isAuthenticated = require('../middlewares/isAuth');

//! add
categoryRouter.post('/api/v1/categories/create',isAuthenticated,  categoryController.create);

//!list
categoryRouter.get('/api/v1/categories/lists',isAuthenticated,  categoryController.lists);

//!update
categoryRouter.put('/api/v1/categories/update/:id',isAuthenticated,  categoryController.update);    

//!delete
categoryRouter.delete('/api/v1/categories/delete/:id',isAuthenticated,  categoryController.delete);

//!Get Category by ID
categoryRouter.get('/api/v1/categories/:id',isAuthenticated, categoryController.getCategoryById);


module.exports = categoryRouter;