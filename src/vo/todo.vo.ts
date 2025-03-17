import { ApiProperty } from '@nestjs/swagger';

export class TodoVo {
  @ApiProperty({ description: 'Todo ID' })
  id: number;

  @ApiProperty({ description: 'Todo title' })
  title: string;

  @ApiProperty({ description: 'Whether the todo is completed' })
  completed: boolean;

  @ApiProperty({ description: 'Creation timestamp in milliseconds' })
  createdAt: number;

  @ApiProperty({ description: 'Last update timestamp in milliseconds' })
  updatedAt: number;

  constructor(data: Partial<TodoVo>) {
    Object.assign(this, data);
  }
}
