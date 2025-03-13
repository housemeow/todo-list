export class TodoVo {
    id: number;
    title: string;
    completed: boolean;
    createdAt: number;
    updatedAt: number;

    constructor(data: Partial<TodoVo>) {
        Object.assign(this, data);
    }
}
