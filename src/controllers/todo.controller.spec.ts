import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from '../services/todo.service';
import { TodoVo } from '../vo/todo.vo';
import { CreateTodoDto } from '../../db/dto/create-todo.dto';
import { UpdateTodoDto } from '../../db/dto/update-todo.dto';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  const mockTodoService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const mockTodos = [
        {
          id: 1,
          title: 'Test Todo 1',
          completed: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: 2,
          title: 'Test Todo 2',
          completed: true,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ];
      mockTodoService.findAll.mockResolvedValue(mockTodos);

      const result = await controller.findAll();
      expect(result).toEqual(mockTodos.map((todo) => new TodoVo(todo)));
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single todo', async () => {
      const mockTodo = {
        id: 1,
        title: 'Test Todo',
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      mockTodoService.findOne.mockResolvedValue(mockTodo);

      const result = await controller.findOne('1');
      expect(result).toEqual(new TodoVo(mockTodo));
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'New Todo',
        completed: false,
      };
      const mockCreatedTodo = {
        id: 1,
        ...createTodoDto,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      mockTodoService.create.mockResolvedValue(mockCreatedTodo);

      const result = await controller.create(createTodoDto);
      expect(result).toEqual(new TodoVo(mockCreatedTodo));
      expect(service.create).toHaveBeenCalledWith(createTodoDto);
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Todo',
        completed: true,
      };
      const mockUpdatedTodo = {
        id: 1,
        ...updateTodoDto,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      mockTodoService.update.mockResolvedValue(mockUpdatedTodo);

      const result = await controller.update('1', updateTodoDto);
      expect(result).toEqual(new TodoVo(mockUpdatedTodo));
      expect(service.update).toHaveBeenCalledWith(1, updateTodoDto);
    });
  });

  describe('remove', () => {
    it('should remove a todo', async () => {
      mockTodoService.remove.mockResolvedValue(undefined);

      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
