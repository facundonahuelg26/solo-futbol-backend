import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from 'src/auth/auth.service'
import { AuthUserDto } from 'src/auth/dto/auth-user.dto'
import { RefreshTokenDto } from 'src/auth/dto/refresh-token.dto'

const AUTH_TAG = 'Authentication'
@Controller('auth')
@ApiTags(AUTH_TAG)
export class AuthController {
  constructor(private usersService: AuthService) {}
  @ApiResponse({ status: 200, description: 'User authenticated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  @HttpCode(200)
  authUser(@Body() user: AuthUserDto) {
    return this.usersService.authUser(user)
  }

  @ApiResponse({ status: 200, description: 'Token refreshed.' })
  @ApiResponse({ status: 400, description: 'Invalid refresh token.' })
  @Post('refresh-token')
  @HttpCode(200)
  refreshToken(@Body() tokenDto: RefreshTokenDto) {
    return this.usersService.refreshAuthToken(tokenDto.refreshToken)
  }
}
