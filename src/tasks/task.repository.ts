import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatus } from './task.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(getTaskFilter: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = getTaskFilter;

    const tasksQuery = this.createQueryBuilder('task').orderBy('id', 'ASC');

    if (status) {
      tasksQuery.andWhere('task.status=:status', { status });
    }

    if (search) {
      tasksQuery.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    const tasks = await tasksQuery.getMany();
    return tasks;
  }

  /**
   * Repository method to create a task
   *
   * @param createTask
   */
  async createTask(createTask: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.title = createTask.title;
    task.description = createTask.description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }
}
