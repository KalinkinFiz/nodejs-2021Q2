const Board = require('./board.model');

const Boards = [new Board()];

const getAll = async () => Boards;

const getById = async (id) => Boards.find((board) => board.id === id);

const createBoard = async ({ id, title, columns }) => {
  const board = new Board({ id, title, columns });
  Boards.push(board);
  return board;
};

const deleteById = async (id) => {
  const boardPosition = Boards.findIndex((board) => board.id === id);

  if (boardPosition === -1) return null;

  const boardDeletable = Boards[boardPosition];

  Boards.splice(boardPosition, 1);
  return boardDeletable;
};

const updateById = async ({ id, title, columns }) => {
  const boardPosition = Boards.findIndex((board) => board.id === id);

  if (boardPosition === -1) return null;

  const oldBoard = Boards[boardPosition];
  const newBoard = { ...oldBoard, title, columns };

  Boards.splice(boardPosition, 1, newBoard);
  return newBoard;
};

module.exports = {
  Boards,
  getAll,
  getById,
  createBoard,
  deleteById,
  updateById,
};
