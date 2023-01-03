import uuid from 'uuid';

import { usersData } from "../../data/users.data";
import { User } from "../../models/user.model";

export class UserService {
    private usersData = [
        ...usersData
    ];

    public getAutoSuggestUsers(loginSubstring: any, limit: any): User[] {
        return this.usersData
            .filter((user: User) => !user.isDeleted && user.login.includes(loginSubstring))
            .sort((a: User, b: User) => a.login > b.login ? -1 : 1)
            .slice(0, limit);
    };

    public getUserById(id: string): User {
        return this.usersData.find((user: User) => user.id === id) || {} as User;
    };

    public createUser(user: User): User {
        const newUser = { ...user, id: uuid.v4() }; 
        this.usersData = [
            ...this.usersData,
            newUser
        ];
        return newUser
    };

    public updateUser(user: User): User {
        return {
            ...this.usersData.find((userInfo: User) => userInfo.id === user.id),
            ...user
        };
    };

    public removeUser(user: User): User {
        return {
            ...user,
            isDeleted: true,
        };
    };
}