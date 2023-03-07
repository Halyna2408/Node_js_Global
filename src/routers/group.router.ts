import express from 'express';
import * as groupController from '../controllers/group.controller';
import { tryCatchWrapper } from '../helpers/try-catch-wrapper.helper';

const groupRouters = express.Router();

groupRouters.route('/')
  .get(tryCatchWrapper(groupController.getAllGroups))
  .post(tryCatchWrapper(groupController.createGroup))

groupRouters.route('/:groupId')
  .get(tryCatchWrapper(groupController.getGroupById))
  .patch(tryCatchWrapper(groupController.updateGroupById))
  .delete(tryCatchWrapper(groupController.deleteGroup))

groupRouters.route('/:groupId/add-users')
  .post(tryCatchWrapper(groupController.addUsersToGroup))
  .get(tryCatchWrapper(groupController.countUsersInGroup))

export {
  groupRouters,
}