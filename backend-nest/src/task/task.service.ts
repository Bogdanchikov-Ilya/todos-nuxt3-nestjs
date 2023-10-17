import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private repository: Repository<Task>,
  ) {}
  create(createTaskDto: CreateTaskDto) {
    return this.repository.save(createTaskDto);
  }

  findAll(userId: number) {
    console.log(userId);
    return this.repository.find({
      where: { user_id: userId },
      select: ['id', 'title', 'completed', 'user_id'],
    });
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.repository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
