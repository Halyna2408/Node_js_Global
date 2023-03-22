import { AuthSchema } from './../models/auth.schema';
import express from 'express';
import { tryCatchWrapper } from '../helpers/try-catch-wrapper.helper';
import { validateUserSchema } from './middleware/validation.middleware';
import * as authController from '../controllers/auth.controller';

const authRouters = express.Router();


authRouters.route('/login')
  .post(validateUserSchema(AuthSchema), tryCatchWrapper(authController.login))

authRouters.route('/registration')
  .post(validateUserSchema(AuthSchema), tryCatchWrapper(authController.registration))

authRouters.route('/refresh-token')
  .post(validateUserSchema(AuthSchema), tryCatchWrapper(authController.setToken))

export {
  authRouters,
}