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

export {
  groupRouters,
}