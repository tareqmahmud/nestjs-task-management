import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task-dto';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatus } from './task.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
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

    return foundTask;
  }

  /**
   * Service for create the task
   *
   * @param createTaskDto
   * @param user
   */
  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
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

    return task;
  }

  /**
   * Service for delete a task
   *
   * @param id
   */
  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException();
    }
  }
}
