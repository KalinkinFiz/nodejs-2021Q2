const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();
const getById = (id) => boardsRepo.getById(id);
const createBoard = ({ id, title, columns }) =>
  boardsRepo.createBoard({ id, title, columns });
const deleteById = async (id) => {
  const boardDeletable = await getById(id);
  boardsRepo.deleteById(id);
  tasksRepo.deleteByBoardId(id);

  return boardDeletable;
};
const updateById = ({ id, title, columns }) =>
  boardsRepo.updateById({ id, title, columns });

module.exports = { getAll, getById, createBoard, deleteById, updateById };
