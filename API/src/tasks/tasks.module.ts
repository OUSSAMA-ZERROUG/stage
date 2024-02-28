import { Module } from '@nestjs/common';

import { TasksService } from 'src/tasks/tasks.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TasksService],
})
export class TasksModule {}
