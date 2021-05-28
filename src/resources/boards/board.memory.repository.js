const Board = require('./board.model');

const BOARDS = [new Board()];

const getAll = async () => BOARDS;

const getById = async (id) => BOARDS.find((board) => board.id === id);

const createBoard = async ({ id, title, columns }) => {
  const board = new Board({ id, title, columns });
  BOARDS.push(board);
  return board;
};

const deleteById = async (id) => {
  const boardPosition = BOARDS.findIndex((board) => board.id === id);

  if (boardPosition === -1) return null;

  const boardDeletable = BOARDS[boardPosition];

  BOARDS.splice(boardPosition, 1);
  return boardDeletable;
};

const updateById = async ({ id, title, columns }) => {
  const boardPosition = BOARDS.findIndex((board) => board.id === id);

  if (boardPosition === -1) return null;

  const oldBoard = BOARDS[boardPosition];
  const newBoard = { ...oldBoard, title, columns };

  BOARDS.splice(boardPosition, 1, newBoard);
  return newBoard;
};

module.exports = {
  BOARDS,
  getAll,
  getById,
  createBoard,
  deleteById,
  updateById,
};
