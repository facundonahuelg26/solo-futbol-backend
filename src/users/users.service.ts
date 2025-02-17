import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import * as bcrypt from 'bcrypt'
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany()
    const dataUsers = users.map((user) => {
      return {
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    })
    return dataUsers
  }

  async createUser(user: CreateUserDto) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt)
    const createdUser = await this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    })
    return {
      email: createdUser.email,
      success: true,
    }
  }
}
