import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { CreateTodoDto } from '../../db/dto/create-todo.dto';
import { UpdateTodoDto } from '../../db/dto/update-todo.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TodoVo } from '../vo/todo.vo';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiQuery({ name: 'title', required: false, description: 'Filter todos by title (fuzzy search)' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all todos', type: [TodoVo] })
  async findAll(@Query('title') title?: string): Promise<TodoVo[]> {
    const todos = await this.todoService.findAll(title);
    return todos.map(todo => new TodoVo({
      ...todo,
      createdAt: todo.createdAt.getTime(),
      updatedAt: todo.updatedAt.getTime()
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single todo' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the todo', type: TodoVo })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async findOne(@Param('id') id: string): Promise<TodoVo> {
    const todo = await this.todoService.findOne(+id);
    return new TodoVo({
      ...todo,
      createdAt: todo.createdAt.getTime(),
      updatedAt: todo.updatedAt.getTime()
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, description: 'Successfully created the todo', type: TodoVo })
  async create(@Body() createTodoDto: CreateTodoDto): Promise<TodoVo> {
    const todo = await this.todoService.create(createTodoDto);
    return new TodoVo({
      ...todo,
      createdAt: todo.createdAt.getTime(),
      updatedAt: todo.updatedAt.getTime()
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo' })
  @ApiResponse({ status: 200, description: 'Successfully updated the todo', type: TodoVo })
  @ApiResponse({ status: 404, description: 'Todo not found' })
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
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiResponse({ status: 200, description: 'Successfully deleted the todo' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.todoService.remove(+id);
  }
} 