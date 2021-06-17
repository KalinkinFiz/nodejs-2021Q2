import tasksRepo from './task.memory.repository';
import { TTask, TTaskModel } from './task.type';

const getAll = async (): Promise<TTaskModel[]> => tasksRepo.getAll();

const getById = async (id: string): Promise<TTaskModel | null> => tasksRepo.getById(id);

const createTask = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: TTask): Promise<TTaskModel> =>
  tasksRepo.createTask({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });

const deleteById = async (id: string): Promise<TTaskModel | null> => tasksRepo.deleteById(id);

const updateById = async (task: TTaskModel): Promise<TTaskModel | null> =>
  tasksRepo.updateById(task);

export default { getAll, getById, createTask, deleteById, updateById };
