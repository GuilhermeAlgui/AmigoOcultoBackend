import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('groups')
export default class Group {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	name: string;

	@Column()
	code: string;

	@Column()
	started: boolean;

	@Column()
	password: string;

	@Column()
	qtdMember: number;

	@OneToMany(() => User, (user) => user.group, {
		cascade: ['insert', 'update'],
	})
	@JoinColumn({ name: 'group_id' })
	users: User[];
}
