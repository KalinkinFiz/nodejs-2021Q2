import { v4 as uuid } from 'uuid';

import { TColumn, IColumn } from './column.type';

export default class Column {
  id: string;

  title: string;

  order: number;

  constructor({ id = uuid(), title = 'COLUMN', order = -1 }: Partial<IColumn> = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static async create(columns: TColumn): Promise<IColumn> {
    return new Column(columns);
  }
}
