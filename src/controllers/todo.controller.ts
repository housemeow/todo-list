import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { CreateTodoDto } from '../../db/dto/create-todo.dto';
import { UpdateTodoDto } from '../../db/dto/update-todo.dto';
import { TodoVo } from '../vo/todo.vo';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<TodoVo[]> {
    const todos = await this.todoService.findAll();
    return todos.map(todo => new TodoVo({
      ...todo,
      createdAt: todo.createdAt.getTime(),
      updatedAt: todo.updatedAt.getTime()
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TodoVo> {
    const todo = await this.todoService.findOne(+id);
    return new TodoVo({
      ...todo,
      createdAt: todo.createdAt.getTime(),
      updatedAt: todo.updatedAt.getTime()
    });
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<TodoVo> {
    const todo = await this.todoService.create(createTodoDto);
    return new TodoVo({
      ...todo,
      createdAt: todo.createdAt.getTime(),
      updatedAt: todo.updatedAt.getTime()
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<TodoVo> {
    const todo = await this.todoService.update(+id, updateTodoDto);
    return new TodoVo({
      ...todo,
      createdAt: todo.createdAt.getTime(),
      updatedAt: todo.updatedAt.getTime()
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.todoService.remove(+id);
  }
} 