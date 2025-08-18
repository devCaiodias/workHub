import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10)
    const user = this.userRepository.create({...createUserDto, password: hashPassword})
    return this.userRepository.save(user)
  }

  async findAll(userWhereUniqueInput: UpdateUserDto) {
    return this.userRepository.findOne({
      where: userWhereUniqueInput,
      select: {
        id: true,
        fullname: true,
        email: true,
        password: false,
      }
    })
  }
  
  
  async update(id: number, data: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({where: {id}})
    if (!user) {
      throw new NotFoundException('User not found')
    }

    Object.assign(user, data)

    return await this.userRepository.save(user)
  }

  async remove(id: number) {
    return this.userRepository.delete({
      id
    })
  }
}
