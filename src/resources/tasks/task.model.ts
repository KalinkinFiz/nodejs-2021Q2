import { v4 as uuid } from 'uuid';

import { TTaskModel, TTask } from './task.type';

class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  boardId: string | null;

  userId: string | null;

  columnId: string | null;

  constructor({
    title = 'TASK',
    order = 0,
    description = 'description',
    boardId = null,
    userId = null,
    columnId = null,
  }: Partial<TTask> = {}) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task: TTaskModel): TTaskModel {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

export default Task;
