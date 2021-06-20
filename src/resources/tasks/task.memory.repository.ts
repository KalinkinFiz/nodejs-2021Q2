import { EntityRepository, AbstractRepository } from 'typeorm';
import TaskModel from './task.entity';

@EntityRepository(TaskModel)
export class TaskRepository extends AbstractRepository<TaskModel> {
  createTask(task: Omit<TaskModel, 'id'>) {
    const tasks = this.repository.create(task);
    return this.manager.save(tasks);
  }

  getAllTasks(boardId: string) {
    return this.repository.find({ boardId });
  }

  getById(id: string) {
    return this.repository.findOne(id);
  }

  updateById(id: string, data: Partial<TaskModel>) {
    return this.repository.update(id, data);
  }

  updateByUserId(userId: string, task: Partial<TaskModel>) {
    return this.repository.update({ userId }, task);
  }

  updateByBoardId(boardId: string, task: Partial<TaskModel>) {
    return this.repository.update({ boardId }, task);
  }

  deleteById(id: string) {
    return this.repository.delete({ id });
  }
}
