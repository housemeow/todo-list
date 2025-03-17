import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from '../models/todo';
import { CreateTodoBo } from 'db/bo/create-todo.bo';
import { TodoAttributes } from 'db/models/interface/todo.type';
import { UpdateTodoBo } from 'db/bo/update-todo.bo';
import { TodoPo } from 'db/po/todo.po';
import { Op, WhereOptions } from 'sequelize';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
  ) {}

  async findAll(title?: string): Promise<TodoPo[]> {
    const where: WhereOptions<TodoAttributes> = {};

    if (title) {
      where.title = {
        [Op.iLike]: `%${title}%`,
      };
    }

    const todos = await this.todoModel.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    return todos.map((todo) => new TodoPo(todo.dataValues));
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
    const [updatedCount, [updatedTodo]] = await this.todoModel.update(
      { ...updateTodo, updatedAt: new Date() } as TodoAttributes,
      {
        where: { id },
        returning: true,
      },
    );

    if (updatedCount === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return new TodoPo(updatedTodo.dataValues);
  }

  async remove(id: number): Promise<void> {
    const todo = await this.todoModel.findByPk(id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    await todo.destroy();
  }
}
