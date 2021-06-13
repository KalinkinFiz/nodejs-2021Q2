import Task from './task.model';
import { TTask, TTaskModel } from './task.type';

const TASKS: TTaskModel[] = [];

const getAll = async (): Promise<TTaskModel[]> => TASKS;

const getById = async (id: string): Promise<TTaskModel | null> =>
  TASKS.find((task) => task.id === id) || null;

const createTask = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: TTask): Promise<TTaskModel> => {
  const task = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  TASKS.push(task);
  return task;
};

const deleteById = async (id: string): Promise<TTaskModel | null> => {
  const boardPosition = TASKS.findIndex((task) => task.id === id);

  if (boardPosition === -1) return null;

  const taskDeletable = TASKS[boardPosition]!;

  TASKS.splice(boardPosition, 1);
  return taskDeletable;
};

const updateById = async ({ id, ...payload }: Partial<TTaskModel>): Promise<TTaskModel | null> => {
  const boardPosition = TASKS.findIndex((task) => task.id === id);

  if (boardPosition === -1) return null;

  const oldBoard = TASKS[boardPosition]!;
  const newBoard = { ...oldBoard, ...payload };

  TASKS.splice(boardPosition, 1, newBoard);
  return newBoard;
};

const removeUserById = async (id: string): Promise<void> => {
  const userTask = TASKS.filter((task) => task.userId === id);

  await Promise.allSettled(userTask.map(async (task) => updateById({ id: task.id, userId: null })));
};

const deleteByBoardId = async (boardId: string): Promise<void> => {
  const boardTask = TASKS.filter((task) => task.boardId === boardId);

  await Promise.allSettled(boardTask.map(async (task) => deleteById(task.id)));
};

export default {
  TASKS,
  getAll,
  getById,
  createTask,
  deleteById,
  updateById,
  removeUserById,
  deleteByBoardId,
};
