import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Users } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(CacheInterceptor)
  @Get()
  async getAllUsers(): Promise<Users[]> {
    const users = await this.usersService.getAllUsers();
    return users;
  }

  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<Users> {
    const user = await this.usersService.getUserById(+id);
    return user;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() createUserDto: CreateUserDto): Promise<Users> {
    const newUser = await this.usersService.createUser(createUserDto);
    return newUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<Users> {
    const user = await this.usersService.deleteUserById(+id);
    return user;
  }
}
