import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<Project>,
  ) { }


  async create(createProjectDto: CreateProjectDto, req: any) {
    const project = this.projectRepository.create({
      ...createProjectDto, user: { id: req.sub.sub }
    })

    return await this.projectRepository.save(project)
  }

  async findAll() {
    return await this.projectRepository.find({
      relations: ['user'],
      select: {
        id: true,
        name: true,
        description: true,
        user: {
          id: true,
          fullname: true,
          email: true
        }
      }
    })
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
