import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from '../models/todo';
import { CreateTodoBo } from 'db/bo/create-todo.bo';
import { TodoAttributes } from 'db/models/interface/todo.type';
import { UpdateTodoBo } from 'db/bo/update-todo.bo';
import { TodoPo } from 'db/po/todo.po';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
  ) {}

  async findAll(): Promise<TodoPo[]> {
    const result = await this.todoModel.findAll();
    console.log(result);
    return result.map((todo) => new TodoPo(todo.dataValues));
  }

  async findOne(id: number): Promise<TodoPo> {
    const todo = await this.todoModel.findByPk(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return new TodoPo(todo.dataValues);
  }

  async create(createTodo: CreateTodoBo): Promise<TodoPo> {
    const result = await this.todoModel.create(createTodo as TodoAttributes);
    return new TodoPo(result.dataValues);
  }

  async update(id: number, updateTodo: UpdateTodoBo): Promise<TodoPo> {
    const todo = await this.todoModel.findByPk(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    const result = await todo.update({ ...updateTodo, updatedAt: new Date() } as TodoAttributes);
    return new TodoPo(result.dataValues);
  }

  async remove(id: number): Promise<void> {
    const todo = await this.todoModel.findByPk(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    await todo.destroy();
  }
} 