import {
  Controller,
  Get,
  UseGuards,
  Req,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(@Req() req) {
    return this.usersService.findAll();
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @MessagePattern({ cmd: 'find_all_users' })
  async handleFindAllUsers() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'find_user_by_email' })
  async handleFindUserByEmail(data: { email: string }) {
    return this.usersService.findByEmail(data.email);
  }
}
