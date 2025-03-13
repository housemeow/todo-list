import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import { TodoRepository } from '../db/repositories/todo.repository';
import { Todo } from '../db/models/todo';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_NAME ?? 'todo_db',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Todo]),
  ],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository],
})
export class AppModule {}
