import { json, request, Request, Response } from 'express';

import { createQueryBuilder, getConnection, getRepository } from 'typeorm';
import User from '../models/User';
import Group from '../models/Group';

export default {
	async create(request: Request, response: Response) {
		const { id, name, wish, leader } = request.body;

		const groupRepository = getRepository(Group);

		const group = await groupRepository.findOneOrFail(id);

		const userRepository = getRepository(User);

		const users = await userRepository.find({
			where: { group_id: id },
		});

		if (group.qtdMember === users.length) {
			return response.status(201).json({ message: false });
		}

		const data = { name, wish, group: id, group_id: id, friend: 0, leader };
		console.log(data);

		const user = userRepository.create(data);

		await userRepository.save(user);

		return response.status(201).json({ user, message: true });
	},

	async index(request: Request, response: Response) {
		const userRepository = getRepository(User);

		const user = await getConnection()
			.createQueryBuilder()
			.select('users')
			.from(User, 'users')
			.getMany();

		const users = await userRepository.find();

		return response.status(201).json(user);
	},

	async indexByGroup(request: Request, response: Response) {
		const { id } = request.body;
		const userRepository = getRepository(User);
		console.log(id);

		const users = await userRepository.find({
			where: { group_id: id },
		});

		console.log(users);

		return response.status(201).json(users);
	},

	async startUsers(request: Request, response: Response) {
		const { id } = request.body;

		const userRepository = getRepository(User);

		const users = await userRepository.find({
			where: { group_id: id },
		});

		let userList = [];

		for (let i = 0; i < users.length; i++) {
			userList.push(users[i].id);
		}
		//console.log(userList)

		userList = userList.sort(() => Math.random() - 0.5);

		//console.log(userList)

		for (let i = 0; i < userList.length - 1; i++) {
			let userUpdate = await userRepository.findOne(userList[i]);
			if (userUpdate) {
				userUpdate.friend = userList[i + 1];
				await userRepository.save(userUpdate);
			}
		}

		let userUpdate = await userRepository.findOne(
			userList[userList.length - 1]
		);
		if (userUpdate) {
			userUpdate.friend = userList[0];
			await userRepository.save(userUpdate);
		}

		return response.status(201).json({ userList });
	},

	async indexById(request: Request, response: Response) {
		const { id } = request.body;
		const userRepository = getRepository(User);

		const users = await userRepository.findOne({
			where: { id: id },
		});

		return response.status(201).json(users);
	},

	async getGroupsId(request: Request, response: Response) {
		const { id } = request.body;
		const userRepository = getRepository(User);

		const users = await userRepository.findOne({
			where: { id: id },
		});

		const groupId = users?.group;

		const groupRepository = getRepository(Group);

		const groups = await groupRepository.find({
			where: { id: groupId },
		});

		return response.status(201).json(groups);
	},
	async getMultiGroupsId(request: Request, response: Response) {
		const { idGroup } = request.body;
		console.log(idGroup);
		const userRepository = getRepository(User);

		const groupList = [];
		const userList = [];

		for (let i = 0; i < idGroup.length; i++) {
			const id = idGroup[i];
			const users = await userRepository.findOne({
				where: { id: id },
			});
			console.log(users);
			userList.push(users);
			const groupId = users?.group_id;

			const groupRepository = getRepository(Group);

			const groups = await groupRepository.findOne({
				where: { id: groupId },
			});
			groupList.push(groups);
		}

		const data = { groupList, userList };

		console.log(data);

		return response.status(201).json(data);
	},
};
