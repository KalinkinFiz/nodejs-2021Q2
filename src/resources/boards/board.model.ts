import { v4 as uuid } from 'uuid';

import { TBoardModel, TColumn, TBoardPartial } from './board.type';

class Board {
  id: string;

  title: string;

  columns: TColumn[];

  constructor({ title = 'BOARD', columns = [] }: TBoardPartial = {}) {
    this.id = uuid();
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: TBoardModel): TBoardModel {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export default Board;
