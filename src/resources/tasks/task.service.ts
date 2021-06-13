/**
 * @file   This file defines a task service
 * @author KalinkinFiz
 * @since  1.0.0
 *
 * @namespace Tasks
 */

import tasksRepo from './task.memory.repository';
import { TTask, TTaskModel } from './task.type';

/**
 * Get all tasks
 * @returns {Promise<TTask[]>} - array of tasks
 */
const getAll = async (): Promise<TTaskModel[]> => tasksRepo.getAll();

/**
 * Task return by id
 * @param id - id task
 * @returns {Promise<?TTask>} - return task object or null
 */
const getById = async (id: string): Promise<TTaskModel | null> => tasksRepo.getById(id);

/**
 * Create tasks
 * @param {TTask} task - new task parameters
 * @returns {Promise<TTask>} - return new task object
 */
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

/**
 * Delete task
 * @param id - task id
 * @returns {Promise<?TTask>} - return task object or null
 */
const deleteById = async (id: string): Promise<TTaskModel | null> => tasksRepo.deleteById(id);

/**
 * Update task
 * @param {TTask} newBoard - params for task update
 * @returns {Promise<?TTask>} - return task object or null
 */
const updateById = async (task: TTaskModel): Promise<TTaskModel | null> =>
  tasksRepo.updateById(task);

export default { getAll, getById, createTask, deleteById, updateById };
