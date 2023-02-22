import express from 'express';
import * as groupController from '../controllers/group.controller';

const groupRouters = express.Router();

groupRouters.route('/')
  .get(groupController.getAllGroups)
  .post(groupController.createGroup)

groupRouters.route('/:groupId')
  .get(groupController.getGroupById)
  .patch(groupController.updateGroupById)
  .delete(groupController.deleteGroup)

groupRouters.route('/:groupId/add-users')
  .post(groupController.addUsersToGroup)
  .get(groupController.countUsersInGroup)

export {
  groupRouters,
}