import { Controller, Get, Post, Body, Patch, Request, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post('create')
  @UseGuards(AuthGuard)
  create(@Body() createProjectDto: CreateProjectDto, @Request() req: any) {
    return this.projectService.create(createProjectDto, req)
  }

  @Get('all')
  @UseGuards(AuthGuard)
  findAll() {
    return this.projectService.findAll();
  }

  @Get('my-projects')
  @UseGuards(AuthGuard)
  async getMyProjects(@Req() req) {
    const userId = req.user.sub;
    return this.projectService.findByUser(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findId(@Param('id') id: number) {
    return this.projectService.findId(id)
  }

  @Get(':id/task')
  @UseGuards(AuthGuard)
  async findTasksByProjectId(@Param('id') id: number) {
    return this.projectService.findTasks(id)
  }


  @Patch('update/:id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto)
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.projectService.remove(id);
  }
}
