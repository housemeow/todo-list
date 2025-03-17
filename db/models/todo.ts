import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { TodoAttributes } from './interface/todo.type';

@Table({
  tableName: 'todos',
  timestamps: true,
})
export class Todo extends Model<TodoAttributes> implements TodoAttributes {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare completed: boolean;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare updatedAt: Date;
}
