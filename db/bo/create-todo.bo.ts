export class CreateTodoBo {
  title: string;
  completed: boolean;

  constructor(data: Partial<CreateTodoBo>) {
    Object.assign(this, data);
  }
}
