import { getCustomRepository } from 'typeorm';
import TaskModel from './task.entity';

import { TaskRepository } from './task.memory.repository';

const createTask = async (boardId: string, data: Omit<TaskModel, 'id'>): Promise<TaskModel> => {
  const taskRepository = getCustomRepository(TaskRepository);
  const taskCreatable = { ...data, boardId };
  const task = await taskRepository.createTask(taskCreatable);
  return task;
};

const getAll = async (boardId: string): Promise<TaskModel[]> => {
  const taskRepository = getCustomRepository(TaskRepository);
  return taskRepository.getAllTasks(boardId);
};

const getById = async (boardId: string, id: string): Promise<TaskModel | null> => {
  const taskRepository = getCustomRepository(TaskRepository);
  const task = await taskRepository.getById(boardId, id);
  if (!task) return null;
  return task;
};

const deleteById = async (boardId: string, id: string): Promise<TaskModel | null> => {
  const taskRepository = getCustomRepository(TaskRepository);
  const taskDeletable = await taskRepository.getById(boardId, id);
  if (!taskDeletable) return null;
  await taskRepository.deleteById(boardId, id);
  return taskDeletable;
};

const updateById = async (
  boardId: string,
  id: string,
  data: Partial<Omit<TaskModel, 'id'>>,
): Promise<TaskModel | null> => {
  const taskRepository = getCustomRepository(TaskRepository);
  const task = await taskRepository.getById(boardId, id);
  if (!task) return null;
  await taskRepository.updateById(boardId, id, data);
  return task;
};

export default { getAll, getById, createTask, deleteById, updateById };
