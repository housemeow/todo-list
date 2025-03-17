export class UpdateTodoBo {
  id: number;
  title: string;
  completed: boolean;

  constructor(data: Partial<UpdateTodoBo>) {
    Object.assign(this, data);
  }
}
