import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task-dto';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatus } from './task.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  private tasksLogger = new Logger('tasks');

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  /**
   * Service to get tasks by filter or without filter
   *
   * @param getTaskFilter
   * @param user
   */
  async getTasks(
    getTaskFilter: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    // Logger
    this.tasksLogger.verbose(`All the tasks fetched by ${user.username}`);

    return this.taskRepository.getTasks(getTaskFilter, user);
  }

  /**
   * Service to retrieve a task by it's it
   *
   * @param id
   * @param user
   */
  async getTaskById(id: number, user: User): Promise<Task> {
    const foundTask = await this.taskRepository.findOne({
      where: { id: id, user: user },
    });

    if (!foundTask) {
      throw new NotFoundException();
    }

    // Logger
    this.tasksLogger.verbose(
      `The task ${foundTask.title} is fetched by ${user.username}`,
    );

    return foundTask;
  }

  /**
   * Service for create the task
   *
   * @param createTaskDto
   * @param user
   */
  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    // Logger
    this.tasksLogger.verbose(`A new task has been created by ${user.username}`);

    return this.taskRepository.createTask(createTaskDto, user);
  }

  /**
   * Service to change the status
   *
   * @param id
   * @param status
   * @param user
   */
  async changeStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();

    // Logger
    this.tasksLogger.verbose(
      `A task status updated for ${task.title} by ${user.username}`,
    );

    return task;
  }

  /**
   * Service for delete a task
   *
   * @param id
   * @param user
   */
  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({
      id,
      user,
    });

    if (!result.affected) {
      this.tasksLogger.error(`Invalid task`);
      throw new NotFoundException();
    }
  }
}
