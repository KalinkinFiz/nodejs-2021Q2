import { v4 as uuid } from 'uuid';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'tasks' })
export default class Task {
  @PrimaryColumn('uuid')
  public id: string = uuid();

  @Column()
  public title: string = 'Task';

  @Column()
  order: number = 0;

  @Column()
  description: string = '';

  @Column('varchar', { length: 36, nullable: true })
  userId!: string | null;

  @Column('varchar', { length: 36, nullable: true })
  boardId!: string | null;

  @Column('varchar', { length: 36, nullable: true })
  columnId!: string | null;

  static toResponse(task: Omit<Task, 'id'>) {
    return task;
  }
}
