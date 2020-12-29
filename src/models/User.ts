import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Group from './Group'

@Entity('users')
export default class User{
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    wish: string;

    @Column("int",{nullable: true})
    group_id: number;

    @Column()
    friend: number;

    @Column()
    leader: boolean;

    @ManyToOne(()=>Group,group => group.users)
    @JoinColumn({name: 'group_id'})
    group: Group;


}