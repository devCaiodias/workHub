import { Controller, Post, Body, Get, Param, ParseIntPipe, UseGuards, Patch, Delete} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('singup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number){
    return this.usersService.findAll({id})
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() userData: UpdateAuthDto) {
    return this.usersService.update(id, userData)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id)
  }

  
}
