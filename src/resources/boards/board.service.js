/**
 * @file   This file defines a board class
 * @author KalinkinFiz
 * @since  1.0.0
 *
 * @namespace Boards
 */

const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

/**
 * Get all boards
 * @returns {Promise<TBoard[]>} - array of boards
 */
const getAll = async () => boardsRepo.getAll();

/**
 * Board return by id
 * @param {string} id - id board
 * @returns {Promise<?TBoard>} - return board object or null
 */
const getById = async (id) => boardsRepo.getById(id);

/**
 * Create boards
 * @param {TBoard} board - new board parameters
 * @returns {Promise<TBoard>} - return new board object
 */
const createBoard = async ({ id, title, columns }) =>
  boardsRepo.createBoard({ id, title, columns });

/**
 * Delete board; Removing taskboards
 * @param {string} id - board id
 * @returns {Promise<?TBoard>} - return board object or null
 */
const deleteById = async (id) => {
  const boardDeletable = await getById(id);
  boardsRepo.deleteById(id);
  tasksRepo.deleteByBoardId(id);

  return boardDeletable;
};

/**
 * Update board
 * @param {TBoard} newBoard - params for board update
 * @returns {Promise<?TBoard>} - return board object or null
 */
const updateById = async ({ id, title, columns }) =>
  boardsRepo.updateById({ id, title, columns });

module.exports = { getAll, getById, createBoard, deleteById, updateById };
