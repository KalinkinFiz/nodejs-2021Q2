/**
 * @file   This file defines a task service
 * @author KalinkinFiz
 * @since  1.0.0
 *
 * @namespace Tasks
 */

const tasksRepo = require('./task.memory.repository');

/**
 * Get all tasks
 * @returns {Promise<TTask[]>} - array of tasks
 */
const getAll = async () => tasksRepo.getAll();

/**
 * Task return by id
 * @param id - id task
 * @returns {Promise<?TTask>} - return task object or null
 */
const getById = async (id) => tasksRepo.getById(id);

/**
 * Create tasks
 * @param {TTask} task - new task parameters
 * @returns {Promise<TTask>} - return new task object
 */
const createTask = async ({ id, title, order, description, userId, boardId, columnId }) =>
  tasksRepo.createTask({
    id,
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
const deleteById = async (id) => tasksRepo.deleteById(id);

/**
 * Update task
 * @param {TTask} newBoard - params for task update
 * @returns {Promise<?TTask>} - return task object or null
 */
const updateById = async ({ id, title, order, description, userId, boardId, columnId }) =>
  tasksRepo.updateById({
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });

module.exports = { getAll, getById, createTask, deleteById, updateById };
