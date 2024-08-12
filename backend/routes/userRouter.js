const express = require('express');
const userController = require('../controllers/usersCtrl');
const userRouter = express.Router();
const isAuthenticated = require('../middlewares/isAuth');

//! Register
userRouter.post('/api/v1/users/register', userController.register);

//!Login
userRouter.post('/api/v1/users/login', userController.login);

//!Profile
userRouter.get('/api/v1/users/profile', isAuthenticated, userController.profile);

//!Change Password
userRouter.put('/api/v1/users/change-password', isAuthenticated, userController.changeUserPassword);

//!Update Profile
userRouter.put('/api/v1/users/update-profile', isAuthenticated, userController.updateUserProfile);




module.exports = userRouter;