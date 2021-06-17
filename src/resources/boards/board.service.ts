import boardsRepo from './board.memory.repository';
import { TBoard, TBoardModel } from './board.type';
import tasksRepo from '../tasks/task.memory.repository';

const getAll = async (): Promise<TBoardModel[]> => boardsRepo.getAll();

const getById = async (id: string): Promise<TBoardModel | null> => boardsRepo.getById(id);

const createBoard = async ({ title, columns }: TBoard): Promise<TBoardModel> =>
  boardsRepo.createBoard({ title, columns });

const deleteById = async (id: string): Promise<TBoardModel | null> => {
  const boardDeletable = await getById(id);
  boardsRepo.deleteById(id);
  tasksRepo.deleteByBoardId(id);

  return boardDeletable;
};

const updateById = async (board: TBoardModel): Promise<TBoardModel | null> =>
  boardsRepo.updateById(board);

export default { getAll, getById, createBoard, deleteById, updateById };
