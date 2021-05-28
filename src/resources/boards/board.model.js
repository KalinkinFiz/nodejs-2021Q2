/**
 * @file   This file defines a board model
 * @author KalinkinFiz
 * @since  1.0.0
 *
 * @namespace Boards
 */

const { v4: uuid } = require('uuid');

/** Class representing a Board model */
class Board {
  /**
   * Creates a board instance
   * @param {TBoard} board - board Object
   */
  constructor({ id = uuid(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Return static data for board
   * @param {TBoard} board passing the board object
   * @returns {TBoard} - Board parameters
   */
  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
