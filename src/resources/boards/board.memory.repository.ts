import Board from './board.model';
import { TBoardModel, TBoard } from './board.type';

const BOARDS: TBoardModel[] = [];

const getAll = async (): Promise<TBoardModel[]> => BOARDS;

const getById = async (id: string): Promise<TBoardModel | null> =>
  BOARDS.find((board) => board.id === id) || null;

const createBoard = async ({ title, columns }: TBoard): Promise<TBoardModel> => {
  const board = new Board({ title, columns });
  BOARDS.push(board);
  return board;
};

const deleteById = async (id: string): Promise<TBoardModel | null> => {
  const boardPosition = BOARDS.findIndex((board) => board.id === id);

  if (boardPosition === -1) return null;

  const boardDeletable = BOARDS[boardPosition];

  BOARDS.splice(boardPosition, 1);
  return boardDeletable!;
};

const updateById = async ({ id, title, columns }: TBoardModel): Promise<TBoardModel | null> => {
  const boardPosition = BOARDS.findIndex((board) => board.id === id);

  if (boardPosition === -1) return null;

  const oldBoard = BOARDS[boardPosition]!;
  const newBoard = { ...oldBoard, title, columns };

  BOARDS.splice(boardPosition, 1, newBoard);
  return newBoard;
};

export default {
  BOARDS,
  getAll,
  getById,
  createBoard,
  deleteById,
  updateById,
};
