import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Request,
  Response,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../auth/auth.guard';
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req: any, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create({ ...createTaskDto, user_id: req.user.id });
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.taskService.findAll(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
