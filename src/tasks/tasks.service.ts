import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  /**
   * Service to return all the tasks
   */
  getAllTasks(): Task[] {
    return this.tasks;
  }

  /**
   * Service to get tasks by filter
   *
   * @param filterTaskDto
   */
  getTaskWithFilters(filterTaskDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterTaskDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  /**
   * Service to get a task by it's id
   */
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  /**
   * Service to create a new task
   *
   * @param createTaskDto
   */
  createNewTasks(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    // Create task object
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    // Save the object to db
    this.tasks.push(task);

    return task;
  }

  /**
   * Service to delete a task
   *
   * @param id
   */
  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  /**
   * Service to update the status of a task
   *
   * @param id
   * @param status
   */
  changeTheTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }
}
