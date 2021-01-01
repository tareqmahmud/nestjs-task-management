import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task-dto';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatus } from './task.enum';

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
   */
  async getTasks(getTaskFilter: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(getTaskFilter);
  }

  /**
   * Service to retrieve a task by it's it
   *
   * @param id
   */
  async getTaskById(id: number): Promise<Task> {
    const foundTask = await this.taskRepository.findOne({
      where: { id },
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
   */
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  /**
   * Service to change the status
   *
   * @param id
   * @param status
   */
  async changeStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
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
