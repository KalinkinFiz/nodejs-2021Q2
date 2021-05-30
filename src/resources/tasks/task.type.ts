export interface TTask {
  title: string;
  order: number;
  description: string;
  boardId: string | null;
  userId: string | null;
  columnId: string | null;
}

export interface TTaskModel extends TTask {
  id: string;
}
