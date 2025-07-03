import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: { email: string, password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @MessagePattern({ cmd: 'register' })
  async handleGenerateAuth(data: CreateAuthDto) {
    return this.authService.register(data.email, data.password);
  }

  @MessagePattern({ cmd: 'login' })
  async handleLogin(data: CreateAuthDto) {
    const user = await this.authService.validateUser(data.email, data.password);
    return this.authService.login(user);
  }
}

