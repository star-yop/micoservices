import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {

async findAll() {
  return prisma.user.findMany();
}
  
  async createUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

async findByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}
}
