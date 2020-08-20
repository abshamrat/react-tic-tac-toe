import {
  MigrationInterface,
  QueryRunner,
  getRepository,
  Table
} from "typeorm";


const tableName = 'action_log';  

export class ActionLogTable1597923979011 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: tableName,
              columns: [
                {
                  name: 'id',
                  type: 'int4',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'uuid',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'logMessage',
                  type: 'varchar',
                  isNullable: false,
                }
              ],
            }),
            false,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE ${tableName}`, undefined);
    }

}
