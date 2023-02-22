import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../../data-access/data-access';
import { Group, GroupModel } from "../../models/group.model";
import { UserGroup } from '../../models/user-group.model';
import { User } from "../../models/user.model";

export class GroupService {
  public async getGroupById(id: string): Promise<GroupModel | null> {
    return await Group.findByPk(id);
  }

  public async getAllGroups(): Promise<GroupModel[]> {
    return await Group.findAll({
      order: [[ 'name', 'ASC' ]],
    })
  }

  public async createGroup(group: GroupModel): Promise<GroupModel> {
    return await Group.create({
      ...group,
      id: uuidv4(),
    })
  }

  public async updateGroup(updatedGroup: GroupModel): Promise<GroupModel> {
    return await Group.update({
      ...updatedGroup,
    }, { 
      where: {
        id: updatedGroup.id,
      },
      returning: true,
    }).then(([_, updatedGroups]) => updatedGroups[0]);
  }

  public async deleteGroup(id: string): Promise<void> {
    await Group.destroy({
      where: {
        id,
      },
      force: true,
    });
  }

  public async addUsersToGroup(userIds: any, groupId: string): Promise<any> {  
    const group = await Group.findByPk(groupId) as any;
    return await group.addUser(userIds)
  }
}