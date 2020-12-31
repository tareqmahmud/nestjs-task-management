import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getTasks(@Query() filterTaskDto: GetTasksFilterDto): Task[] {
    if (filterTaskDto) {
      return this.tasksService.getTaskWithFilters(filterTaskDto);
    }

    return this.tasksService.getAllTasks();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createNewTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createNewTasks(createTaskDto);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(id);
  }

  @Patch(':id/status')
  changeTheTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Task {
    return this.tasksService.changeTheTaskStatus(id, status);
  }
}
