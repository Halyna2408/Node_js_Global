import express from 'express';
import * as userController from '../controllers/users.contoller';

const routerUsers = express.Router();

routerUsers.route('/')
  .get(userController.getAllUsers)
  .post(userController.addUser)

routerUsers.route('/:id')
  .get(userController.getUserInfo)
  .patch(userController.updateUserInfo)
  .delete(userController.deleteUser)

export {
  routerUsers
};