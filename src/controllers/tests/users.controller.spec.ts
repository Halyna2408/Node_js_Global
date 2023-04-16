import {Request, Response} from 'express';
import * as userController from '../users.contoller';
import UserService from '../services/users.service';
import { usersData } from '../../data/users.data';
import UserServiceMock from '../mocks/users.service.mock';
import { UserModel } from '../../models/user.model';


describe('Users Controller', () => {
  describe('getAllUsers', () => {
    it('returns users', async () => {
			UserService.prototype.getAutoSuggestUsers = jest.fn().mockReturnValue([{} as UserModel]);
			const req = {} as Request;
			req.query = {
				loginSubstring: 'De',
				limit: '1',
			};
			let response = {} as Response;

			response.status = jest.fn().mockReturnValue(response);
			response.json = jest.fn().mockReturnValue({
				message: 'Success',
				users: usersData,
			});
			const next = jest.fn();
			
			await userController.getAllUsers(req, response, next);
			expect(UserService.prototype.getAutoSuggestUsers).toHaveBeenCalled();
    });
  });

	describe('getUserInfo', () => {
    it('returns user', async () => {
			UserService.prototype.getUserById = jest.fn().mockReturnValue({} as UserModel);
			const req = {} as Request;
			req.params =  { id: '1'};
			let response = {} as Response;

			response.status = jest.fn().mockReturnValue(response);
			response.json = jest.fn().mockReturnValue({
				message: 'Success',
				users: usersData[0],
			});
			const next = jest.fn();
			
			await userController.getUserInfo(req, response, next);
			expect(UserService.prototype.getUserById).toHaveBeenCalled();
    });
  });

	describe('createUser', () => {
    it('should create new user', async () => {
			UserService.prototype.createUser = jest.fn().mockReturnValue([{} as UserModel]);
			const req = {} as Request;
			req.body = {
				id: '12',
				login: 'test',
				password: 'password',
				age: 25,
				isDeleted: false,
			}
			let response = {} as Response;

			response.status = jest.fn().mockReturnValue(response);
			response.json = jest.fn().mockReturnValue({
				message: 'Success',
				user: {
					id: '12',
					login: 'test',
					password: 'password',
					age: 25,
					isDeleted: false,
				},
			});
			const next = jest.fn();
			
			await userController.addUser(req, response, next);
			expect(UserService.prototype.createUser).toHaveBeenCalled();
    });
  });

	describe('updateUserInfo', () => {
    it('should update user info', async () => {
			UserService.prototype.updateUser = jest.fn().mockReturnValue([{} as UserModel]);
			const req = {} as Request;
			req.body = {
				id: '12',
				login: 'test23',
				password: 'password',
				age: 30,
				isDeleted: false,
			}
			let response = {} as Response;

			response.status = jest.fn().mockReturnValue(response);
			response.json = jest.fn().mockReturnValue({
				message: 'Success',
				user: {
					id: '12',
					login: 'test23',
					password: 'password',
					age: 30,
					isDeleted: false,
				},
			});
			const next = jest.fn();
			
			await userController.updateUserInfo(req, response, next);
			expect(UserService.prototype.updateUser).toHaveBeenCalled();
    });
  });

	describe('delete user', () => {
    it('should delete user', async () => {
			UserService.prototype.removeUser = jest.fn().mockReturnValue([{} as UserModel]);
			const req = {} as Request;
			req.params = {
				id: '12',
			};
			let response = {} as Response;

			response.status = jest.fn().mockReturnValue(response);
			response.json = jest.fn().mockReturnValue({
				message: 'User marked as removed',
				user: {
					id: '12',
					login: 'test23',
					password: 'password',
					age: 30,
					isDeleted: false,
				},
			});
			const next = jest.fn();
			
			await userController.deleteUser(req, response, next);
			expect(UserService.prototype.removeUser).toHaveBeenCalled();
    });
  });
});