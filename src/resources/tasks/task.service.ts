import { getCustomRepository } from 'typeorm';
import TaskModel from './task.entity';

import { TaskRepository } from './task.memory.repository';

const createTask = async (boardId: string, tasks: Omit<TaskModel, 'id'>): Promise<TaskModel> => {
  const taskRepository = getCustomRepository(TaskRepository);
  const taskCreatable = { ...tasks, boardId };
  const task = await taskRepository.createTask(taskCreatable);
  return task;
};

const getAll = async (boardId: string): Promise<TaskModel[]> => {
  const taskRepository = getCustomRepository(TaskRepository);
  return taskRepository.getAllTasks(boardId);
};

const getById = async (id: string): Promise<TaskModel | null> => {
  const taskRepository = getCustomRepository(TaskRepository);
  const task = await taskRepository.getById(id);
  if (!task) return null;
  return task;
};

const deleteById = async (id: string): Promise<TaskModel | null> => {
  const taskRepository = getCustomRepository(TaskRepository);
  const taskDeletable = await taskRepository.getById(id);
  if (!taskDeletable) return null;
  await taskRepository.deleteById(id);
  return taskDeletable;
};

const updateById = async (
  id: string,
  tasks: Partial<Omit<TaskModel, 'id'>>,
): Promise<TaskModel | null> => {
  const taskRepository = getCustomRepository(TaskRepository);
  await taskRepository.updateById(id, tasks);
  const task = await taskRepository.getById(id);
  if (!task) return null;
  return task;
};

export default { getAll, getById, createTask, deleteById, updateById };
