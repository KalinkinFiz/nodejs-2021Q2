/**
 * @file   This file defines a board service
 * @author KalinkinFiz
 * @since  1.0.0
 *
 * @namespace Boards
 */

import boardsRepo from './board.memory.repository';
import { TBoard, TBoardModel } from './board.type';
import tasksRepo from '../tasks/task.memory.repository';

/**
 * Get all boards
 * @returns {Promise<TBoardModel[]>} - array of boards
 */
const getAll = async (): Promise<TBoardModel[]> => boardsRepo.getAll();

/**
 * Board return by id
 * @param id - id board
 * @returns {Promise<?TBoardModel>} - return board object or null
 */
const getById = async (id: string): Promise<TBoardModel | null> => boardsRepo.getById(id);

/**
 * Create boards
 * @param {TBoard} board - new board parameters
 * @returns {Promise<TBoardModel>} - return new board object
 */
const createBoard = async ({ title, columns }: TBoard): Promise<TBoardModel> =>
  boardsRepo.createBoard({ title, columns });

/**
 * Delete board; Removing taskboards
 * @param id - board id
 * @returns {Promise<?TBoardModel>} - return board object or null
 */
const deleteById = async (id: string): Promise<TBoardModel | null> => {
  const boardDeletable = await getById(id);
  boardsRepo.deleteById(id);
  tasksRepo.deleteByBoardId(id);

  return boardDeletable;
};

/**
 * Update board
 * @param {TBoardModel} board - params for board update
 * @returns {Promise<?TBoardModel>} - return board object or null
 */
const updateById = async (board: TBoardModel): Promise<TBoardModel | null> =>
  boardsRepo.updateById(board);

export default { getAll, getById, createBoard, deleteById, updateById };
