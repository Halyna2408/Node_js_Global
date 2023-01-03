import express from 'express';
import * as userController from '../controllers/users.contoller';
import { UserSchema } from '../models/user.schema';
import { validateUserSchema } from './middleware/validation.middleware';

const routerUsers = express.Router();

routerUsers.route('/')
  .get(userController.getAllUsers)
  .post(validateUserSchema(UserSchema), userController.addUser)

routerUsers.route('/:id')
  .get(userController.getUserInfo)
  .patch(validateUserSchema(UserSchema), userController.updateUserInfo)
  .delete(userController.deleteUser)

export {
  routerUsers
};