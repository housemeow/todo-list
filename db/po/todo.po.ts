export class TodoPo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  constructor(data: Partial<TodoPo>) {
    Object.assign(this, data);
  }
}
