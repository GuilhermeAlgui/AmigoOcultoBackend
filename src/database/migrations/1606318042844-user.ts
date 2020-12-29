import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class user1606318042844 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         
        await queryRunner.createTable(new Table({
            name: 'users',
            columns:[
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'wish',
                    type: 'varchar',
                },
                {
                    name: 'leader',
                    type: 'boolean',
                },

                {
                    name: 'group_id',
                    type: 'integer',
                },
                {
                    name: 'friend',
                    type: 'integer',
                },
                
                
            ],
            foreignKeys:[{
                name: 'UserGroup',
                columnNames: ['group_id'],
                referencedTableName: 'groups',
                referencedColumnNames: ['id'],
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',

            }]
        }))


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')

    }

}
