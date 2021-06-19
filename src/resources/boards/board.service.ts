import { getCustomRepository } from 'typeorm';

import Board from './board.entity';
import Column from '../columns/column';

import { BoardRepository } from './board.memory.repository';
// import tasksRepo from '../tasks/task.memory.repository';

const createBoard = async (boards: Omit<Board, 'id'>): Promise<Board> => {
  const boardRepository = getCustomRepository(BoardRepository);
  const columns = await Promise.all(boards.columns?.map(Column.create) || []);
  const boardCreatable = { ...boards, columns };
  const board = await boardRepository.createBoard(boardCreatable);
  return board;
};

const getAll = async (): Promise<Board[]> => {
  const boardRepository = getCustomRepository(BoardRepository);
  return boardRepository.getAllBoards();
};

const getById = async (id: string): Promise<Board | null> => {
  const boardRepository = getCustomRepository(BoardRepository);
  const board = await boardRepository.getById(id);
  if (!board) return null;
  return board;
};

const deleteById = async (id: string): Promise<Board | null> => {
  const boardRepository = getCustomRepository(BoardRepository);
  const boardDeletable = await boardRepository.getById(id);
  if (!boardDeletable) return null;
  await boardRepository.deleteById(id);
  return boardDeletable;
};

const updateById = async (
  id: string,
  boards: Partial<Omit<Board, 'id'>>,
): Promise<Board | null> => {
  const boardRepository = getCustomRepository(BoardRepository);
  const columns = await Promise.all(boards.columns?.map(Column.create) || []);
  const boardUpdatable = { ...boards, columns };
  await boardRepository.updateById(id, boardUpdatable);
  const board = await boardRepository.getById(id);
  if (!board) return null;
  return board;
};

export default { getAll, getById, createBoard, deleteById, updateById };
