const Task = require('./task.model');

const TASKS = [new Task()];

const getAll = async () => TASKS;

const getById = async (id) => TASKS.find((task) => task.id === id);

const createTask = async ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}) => {
  const task = new Task({
    id,
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

const deleteById = async (id) => {
  const boardPosition = TASKS.findIndex((task) => task.id === id);

  if (boardPosition === -1) return null;

  const taskDeletable = TASKS[boardPosition];

  TASKS.splice(boardPosition, 1);
  return taskDeletable;
};

const updateById = async ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}) => {
  const boardPosition = TASKS.findIndex((task) => task.id === id);

  if (boardPosition === -1) return null;

  const oldBoard = TASKS[boardPosition];
  const newBoard = {
    ...oldBoard,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  };

  TASKS.splice(boardPosition, 1, newBoard);
  return newBoard;
};

const removeUserById = async (id) => {
  const userTask = TASKS.filter((task) => task.userId === id);

  await Promise.allSettled(
    userTask.map(async (task) => updateById({ id: task.id, userId: null }))
  );
};

const deleteByBoardId = async (boardId) => {
  const boardTask = TASKS.filter((task) => task.boardId === boardId);

  await Promise.allSettled(boardTask.map(async (task) => deleteById(task.id)));
};

module.exports = {
  TASKS,
  getAll,
  getById,
  createTask,
  deleteById,
  updateById,
  removeUserById,
  deleteByBoardId,
};
