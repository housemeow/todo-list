export class TodoDto {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: Partial<TodoDto>) {
        Object.assign(this, data);
    }
}
