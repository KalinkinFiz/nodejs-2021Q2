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

  updateById(id: string, task: Partial<TaskModel>) {
    return this.repository.update({ id }, task);
  }

  deleteById(id: string) {
    return this.repository.delete({ id });
  }
}

// const removeUserById = async (id: string): Promise<void> => {
//   const userTask = TASKS.filter((task) => task.userId === id);

//   await Promise.allSettled(userTask.map(async (task) => updateById({ id: task.id, userId: null })));
// };

// const deleteByBoardId = async (boardId: string): Promise<void> => {
//   const boardTask = TASKS.filter((task) => task.boardId === boardId);

//   await Promise.allSettled(boardTask.map(async (task) => deleteById(task.id)));
// };
