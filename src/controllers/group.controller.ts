import { GroupModel } from './../models/group.model';
import { Request, Response, NextFunction } from 'express';
import { GroupService } from './services/groups.service';

const groupService = new GroupService();

export const getAllGroups = ( async (_: Request, res: Response) => {
    const groups: GroupModel[] = await groupService.getAllGroups();
  
    res.status(200).json({
      message: 'Success',
      groups,
    });
  });

export const getGroupById = ( async (req: Request, res: Response) => {
    const targetGroupId = req.params.groupId;
    const targetGroup: GroupModel | null = await groupService.getGroupById(targetGroupId);
  
    res.status(200).json({
      message: `The group ${ targetGroup } was successufuly found`,
      targetGroup,
    });
  });

export const updateGroupById = ( async (req: Request, res: Response) => {
    const targetGroup: GroupModel | null = await groupService.updateGroup(req.body);
  
    res.status(200).json({
      message: `The group ${ targetGroup } was successufuly updated`,
      targetGroup,
    });
  });

export const createGroup = ( async (req: Request, res: Response) => {
    const newGroup: GroupModel | null = await groupService.createGroup(req.body);
  
    res.status(200).json({
      message: `The group ${ newGroup } was successufuly added`,
      newGroup,
    });
  });

export const deleteGroup = ( async (req: Request, res: Response) => {
    await groupService.deleteGroup(req.params.groupId);  
    res.status(200).json({
      message: `The group  was successufuly deleted`,
    });
  });

  export const addUsersToGroup = ( async (req: Request, res: Response) => {
    await groupService.addUsersToGroup(req.body.userIds, req.params.groupId);  
    res.status(200).json({
      message: `Users was added to group`,
    });
  });
