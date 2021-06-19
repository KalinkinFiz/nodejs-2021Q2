import { v4 as uuid } from 'uuid';
import { Entity, PrimaryColumn, Column } from 'typeorm';

import Columns from '../columns/column';

@Entity({ name: 'boards' })
export default class Board {
  @PrimaryColumn('uuid')
  public id: string = uuid();

  @Column()
  public title: string = 'Board';

  @Column('jsonb')
  public columns: Columns[] = [];

  static toResponse(board: Omit<Board, 'id'>) {
    return board;
  }
}
