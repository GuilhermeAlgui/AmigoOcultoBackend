import { json, request, Request, Response } from 'express';

import { getConnection, getRepository } from 'typeorm';
import Group from '../models/Group';

export default {
	async create(request: Request, response: Response) {
		const { name, password, qtdMember } = request.body;

		const GroupRepository = getRepository(Group);

		const d = new Date();

		const code = `${d.getSeconds()}${d.getMinutes()}${d.getDate()}${d.getMonth()}${d.getFullYear()}`;

		const started = false;

		const data = { name, code, started, password, qtdMember };

		const group = GroupRepository.create(data);
		await GroupRepository.save(group);

		return response.status(201).json(group);
	},

	async index(request: Request, response: Response) {
		const groupRepository = getRepository(Group);

		const groups = await groupRepository.find();

		return response.status(201).json(groups);
	},
	async indexSingleById(request: Request, response: Response) {
		const { id } = request.body;

		const groupRepository = getRepository(Group);

		const group = await groupRepository.findOneOrFail(id);

		return response.status(201).json(group);
	},

	async checkPassword(request: Request, response: Response) {
		const { id, password } = request.body;

		const groupRepository = getRepository(Group);

		try {
			const group = await groupRepository.findOneOrFail({
				where: { id: id, password: password },
			});
			return response.json({ result: true });
		} catch (error) {
			return response.json({ result: false });
		}
	},

	async startGroup(request: Request, response: Response) {
		const { id } = request.body;

		console.log(id);

		const groupRepository = getRepository(Group);

		const group = await groupRepository.findOne({
			where: { id: id },
		});

		await getConnection()
			.createQueryBuilder()
			.update(Group)
			.where('id=:id', { id: id })
			.set({ id: id, started: true })
			.execute();

		const result = await groupRepository.findOne({
			where: { id: id },
		});

		return response.status(201).json(result);
	},

	async IndexByName(request: Request, response: Response) {
		const { name } = request.body;

		const groupRepository = getRepository(Group);

		const group = await groupRepository.find(name);

		return response.status(201).json(group);
	},
	async IndexByCode(request: Request, response: Response) {
		const { code } = request.body;

		const groupRepository = getRepository(Group);

		const group = await groupRepository.find(code);

		return response.status(201).json(group);
	},
};
