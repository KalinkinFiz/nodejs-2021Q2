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

  getById(boardId: string, id: string) {
    return this.repository.findOne({ boardId, id });
  }

  updateById(boardId: string, id: string, data: Partial<TaskModel>) {
    return this.repository.update({ boardId, id }, data);
  }

  updateByUserId(userId: string, task: Partial<TaskModel>) {
    return this.repository.update({ userId }, task);
  }

  updateByBoardId(boardId: string, task: Partial<TaskModel>) {
    return this.repository.update({ boardId }, task);
  }

  deleteById(boardId: string, id: string) {
    return this.repository.delete({ boardId, id });
  }
}
