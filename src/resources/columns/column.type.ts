export interface TColumn {
  title: string;
  order: number;
}

export interface IColumn extends TColumn {
  id: string;
}
