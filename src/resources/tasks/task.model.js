/**
 * @file   This file defines a task model
 * @author KalinkinFiz
 * @since  1.0.0
 *
 * @namespace Tasks
 */

const { v4: uuid } = require('uuid');

/** Class representing a Task model */
class Task {
  /**
   * Creates a task instance
   * @param {TTask} task - task Object
   */
  constructor({
    id = uuid(),
    title = 'TASK',
    order = 0,
    description = 'description',
    boardId = null,
    userId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Return static data for task
   * @param {TTask} task passing the task object
   * @returns {TTask} - Task parameters
   */
  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
