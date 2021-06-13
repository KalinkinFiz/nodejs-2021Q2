export interface TColumn {
  id: string;
  title: string;
  order: number;
}

export interface TBoard {
  title: string;
  columns: TColumn[];
}

export interface TBoardPartial extends Partial<TBoard> {}

export interface TBoardModel extends TBoard {
  id: string;
}
