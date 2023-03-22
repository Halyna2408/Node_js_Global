import express from 'express';
import * as userController from '../controllers/users.contoller';
import { tryCatchWrapper } from '../helpers/try-catch-wrapper.helper';
import { UserSchema } from '../models/user.schema';
import { validateUserSchema } from './middleware/validation.middleware';

const routerUsers = express.Router();

routerUsers.route('/')
  .get(tryCatchWrapper(userController.getAllUsers))
  .post(validateUserSchema(UserSchema), tryCatchWrapper(userController.addUser))

routerUsers.route('/:id')
  .get(tryCatchWrapper(userController.getUserInfo))
  .patch(validateUserSchema(UserSchema), tryCatchWrapper(userController.updateUserInfo))
  .delete(tryCatchWrapper(userController.deleteUser))

export {
  routerUsers
};