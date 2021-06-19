import { EntityRepository, AbstractRepository } from 'typeorm';
import BoardModel from './board.entity';

@EntityRepository(BoardModel)
export class BoardRepository extends AbstractRepository<BoardModel> {
  createBoard(board: Omit<BoardModel, 'id'>) {
    const boards = this.repository.create(board);
    return this.manager.save(boards);
  }

  getAllBoards() {
    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({ id });
  }

  updateById(id: string, board: Partial<BoardModel>) {
    return this.repository.update({ id }, board);
  }

  deleteById(id: string) {
    return this.repository.delete({ id });
  }
}
