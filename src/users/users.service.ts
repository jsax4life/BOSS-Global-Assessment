import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   const { name, email, password, role = 'user' } = createUserDto;

  //   // Check if the email already exists
  //   const existingUser = await this.userRepository.findOne({ where: { email } });
  //   if (existingUser) {
  //     throw new BadRequestException('Email is already in use');
  //   }

  //   // Hash the password
  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   // Create and save the new user
  //   const user = this.userRepository.create({ name, email, password: hashedPassword, role });
  //   return this.userRepository.save(user);
  // }

  async findOne(userId: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

