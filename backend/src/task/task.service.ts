import { Inject, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { LessThan, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Project } from 'src/project/entities/project.entity';
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,

    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<Project>,
  ){

  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const project = await this.projectRepository.findOneBy({id: createTaskDto.projectId})

    if (!project) {
      throw new NotFoundException(`Projeto com Id ${createTaskDto.projectId} não encontrado.`)
    }

    const task = this.taskRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status,
      dataVencimento: createTaskDto.dataVencimento,
      projeto: project
    })

    return await this.taskRepository.save(task)
  }

  async findAll() {
    return await this.taskRepository.find({
      relations: ['projeto'],
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        projeto: {
          name: true,
          description: true
        }
      }
    })
  }

  async findId(id: number) {
    return await this.taskRepository.findOne({where: {id}})
  }
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async removeExpiredTask() {
    const now = new Date()
    await this.taskRepository.delete({
      dataVencimento: LessThan(now)
    })
    console.log("✅ Tarefas vencidas removidas!");
  }

  async update(id: number, data: Partial<Task>): Promise<Task> {
    const task = await this.taskRepository.findOne({where: {id}})

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    Object.assign(task, data)

    return await this.taskRepository.save(task)
  }

  async remove(id: number) {
    return this.taskRepository.delete({
      id
    })
  }
}
