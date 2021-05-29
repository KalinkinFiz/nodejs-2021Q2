/**
 * @file   This file defines a board model
 * @author KalinkinFiz
 * @since  1.0.0
 *
 * @namespace Boards
 */

import { v4 as uuid } from 'uuid';

import { TBoardModel, TColumn, TBoardPartial } from './board.type';

/** Class representing a Board model */
class Board {
  /**
   * Creates a board instance
   * @param {TBoardModel} board - board Object
   */
  id: string;

  title: string;

  columns: TColumn[];

  constructor({ title = 'BOARD', columns = [] }: TBoardPartial = {}) {
    this.id = uuid();
    this.title = title;
    this.columns = columns;
  }

  /**
   * Return static data for board
   * @param {TBoardModel} board passing the board object
   * @returns {TBoardModel} - Board parameters
   */
  static toResponse(board: TBoardModel): TBoardModel {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export default Board;
