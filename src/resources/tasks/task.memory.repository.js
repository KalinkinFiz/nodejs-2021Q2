const Task = require('./task.model');

const Tasks = [new Task()];

const getAll = async () => Tasks;

const getById = async (id) => Tasks.find((task) => task.id === id);

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
  Tasks.push(task);
  return task;
};

const deleteById = async (id) => {
  const boardPosition = Tasks.findIndex((task) => task.id === id);

  if (boardPosition === -1) return null;

  const taskDeletable = Tasks[boardPosition];

  Tasks.splice(boardPosition, 1);
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
  const boardPosition = Tasks.findIndex((task) => task.id === id);

  if (boardPosition === -1) return null;

  const oldBoard = Tasks[boardPosition];
  const newBoard = {
    ...oldBoard,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  };

  Tasks.splice(boardPosition, 1, newBoard);
  return newBoard;
};

module.exports = {
  Tasks,
  getAll,
  getById,
  createTask,
  deleteById,
  updateById,
};
