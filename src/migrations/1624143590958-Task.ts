import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Task1624143590958 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            generationStrategy: 'uuid',
            isGenerated: true,
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varChar',
          },
          {
            name: 'order',
            type: 'int',
          },
          {
            name: 'description',
            type: 'varChar',
          },
          {
            name: 'userId',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'boardId',
            type: 'varChar',
            isNullable: true,
          },
          {
            name: 'columnId',
            type: 'text',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
