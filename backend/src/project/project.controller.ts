import { Controller, Get, Post, Body, Patch, Request, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from 'src/auth/auth.guard';

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
