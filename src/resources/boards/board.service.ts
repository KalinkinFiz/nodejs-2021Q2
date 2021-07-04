import { getCustomRepository } from 'typeorm';

import BoardModel from './board.entity';
import Column from '../columns/column';

import { BoardRepository } from './board.repository';
import { TaskRepository } from '../tasks/task.repository';

const createBoard = async (data: Omit<BoardModel, 'id'>): Promise<BoardModel> => {
  const boardRepository = getCustomRepository(BoardRepository);
  const columns = await Promise.all(data.columns?.map(Column.create) || []);
  const boardCreatable = { ...data, columns };
  const board = await boardRepository.createBoard(boardCreatable);
  return board;
};

const getAll = async (): Promise<BoardModel[]> => {
  const boardRepository = getCustomRepository(BoardRepository);
  return boardRepository.getAllBoards();
};

const getById = async (id: string): Promise<BoardModel | null> => {
  const boardRepository = getCustomRepository(BoardRepository);
  const board = await boardRepository.getById(id);
  if (!board) return null;
  return board;
};

const deleteById = async (id: string): Promise<BoardModel | null> => {
  const boardRepository = getCustomRepository(BoardRepository);
  const boardDeletable = await boardRepository.getById(id);
  if (!boardDeletable) return null;
  await boardRepository.deleteById(id);

  const taskRepository = getCustomRepository(TaskRepository);
  await taskRepository.updateByBoardId(id, { boardId: null });

  return boardDeletable!;
};

const updateById = async (
  id: string,
  data: Partial<Omit<BoardModel, 'id'>>,
): Promise<BoardModel | null> => {
  const boardRepository = getCustomRepository(BoardRepository);
  const columns = await Promise.all(data.columns?.map(Column.create) || []);
  const boardUpdatable = { ...data, columns };
  await boardRepository.updateById(id, boardUpdatable);
  const board = await boardRepository.getById(id);
  if (!board) return null;
  return board;
};

export default { getAll, getById, createBoard, deleteById, updateById };
