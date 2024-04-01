import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { CreateUserDto } from 'src/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async getAllUsers(): Promise<Users[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save({
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
    });
    return newUser;
  }

  async deleteUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.delete(id);
    return user;
  }

  //   async findByUsername(username: string): Promise<User | undefined> {
  //     return this.usersRepository.findOne({ where: { username } });
  //   }

  //   async create(user: Partial<User>): Promise<User> {
  //     return this.usersRepository.save(user);
  //   }
}
