import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class createGroup1605802724465 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'groups',
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
                    name: 'code',
                    type: 'varchar',
                },
                {
                    name: 'started',
                    type: 'boolean',
                },
                {
                    name: 'qtdMember',
                    type: 'integer',
                },
                {
                    name: 'password',
                    type: 'varchar'
                }

            ]
        }))


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('groups')
    }

}
