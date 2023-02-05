import { Group, GroupModel } from "../../models/group.model";


export class GroupService {
  public async getGroupById(id: string): Promise<GroupModel | null> {
    return await Group.findOne({
      where: {
        id
      },
    });
  }

  public async getAllGroups(): Promise<GroupModel[]> {
    return await Group.findAll({
      order: [[ 'name', 'ASC' ]],
    })
  }

  public async createGroup(group: GroupModel): Promise<GroupModel> {
    return await Group.create({
      ...group,
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
}