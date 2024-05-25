import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { UsersService } from 'src/users/users.service'

const USERS_TAG = 'Users'

@Controller('users')
@ApiTags(USERS_TAG)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({ status: 200, description: 'Get all users.' })
  @Get()
  getUsers() {
    return this.usersService.getUsers()
  }

  @ApiResponse({ status: 201, description: 'User created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user)
  }
}
