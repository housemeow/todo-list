import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../../db/repositories/todo.repository';
import { CreateTodoDto } from '../../db/dto/create-todo.dto';
import { UpdateTodoDto } from '../../db/dto/update-todo.dto';
import { TodoDto } from '../../db/dto/todo.dto';
import { CreateTodoBo } from 'db/bo/create-todo.bo';
import { UpdateTodoBo } from 'db/bo/update-todo.bo';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async findAll(title?: string): Promise<TodoDto[]> {
    const todos = await this.todoRepository.findAll(title);
    return todos.map((todo) => new TodoDto(todo));
  }

  async findOne(id: number): Promise<TodoDto> {
    const todo = await this.todoRepository.findOne(id);
    return new TodoDto(todo);
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoDto> {
    const todo = await this.todoRepository.create(
      new CreateTodoBo(createTodoDto),
    );
    return new TodoDto(todo);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoDto> {
    const todo = await this.todoRepository.update(
      id,
      new UpdateTodoBo(updateTodoDto),
    );
    return new TodoDto(todo);
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.remove(id);
  }
}
