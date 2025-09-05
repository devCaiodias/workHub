import { Controller, Get, Post, Body, Patch, Param, Request, Delete, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto)
  }

  @Get('all')
  @UseGuards(AuthGuard)
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findId(@Param('id') id: number) {
    return this.taskService.findId(id)
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number) {
    return this.taskService.remove(id);
  }
}
