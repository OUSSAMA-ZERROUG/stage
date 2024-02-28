import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable({})
export class TasksService {
  constructor() {}
  // The logger is used to log messages to the console.
  private readonly logger = new Logger(TasksService.name);

  // Cron jobs can be used to schedule tasks to run periodically at a certain time or day.
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCron() {
    // This method will be called every day at midnight. It will be used to send reminders to users, update users between both databases, etc.
    this.logger.debug('Called every day at midnight');
  }
}
