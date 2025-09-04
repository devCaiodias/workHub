import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { Task } from 'src/task/entities/task.entity';
import { MoreThan } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<Project>,

    @Inject('TASK_REPOSITORY')
   private taskRepository: Repository<Task>
  ) { }


  async create(createProjectDto: CreateProjectDto, req: any) {
    const project = this.projectRepository.create({
      ...createProjectDto, user: { id: req.user.sub }
    })

    return await this.projectRepository.save(project)
  }

  async findAll() {
    return await this.projectRepository.find({
      relations: ['tarefas','user'],
      select: {
        id: true,
        name: true,
        imgUrl: true,
        user: {
          id: true,
          fullname: true,
          email: true
        },
        tarefas: {
          title: true,
          description: true,
          status: true,
          dataVencimento: true
        }
      }
    })
  }

async findId(id: number) {
  return await this.projectRepository.findOne({where: {id}})
}

async findTasks(projectId: number) {
  return await this.taskRepository.find({where: {projeto: {id: projectId}, dataVencimento: MoreThan(new Date())}})
}

  async update(id: number, data: Partial<Project>): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } })
    if (!project) {
      throw new NotFoundException('Project not found')
    }

    Object.assign(project, data)

    return await this.projectRepository.save(project)
  }

  async remove(id: number) {
    return this.projectRepository.delete({
      id
    })
  }
}
