import { GroupModel } from './../models/group.model';
import { GroupName, Permissions } from "../models/group.model";

export const groupData = [
  {
    id: '4d640e0099',
    name: GroupName.DEV,
    permissions: [ Permissions.WRITE ],
  },
  {
    id: '4d640e0100',
    name: GroupName.LEAD,
    permissions: [ Permissions.WRITE ],
  },
  {
    id: '4d640e0101',
    name: GroupName.BA,
    permissions: [ Permissions.WRITE, Permissions.UPLOAD_FILES ],
  },
];