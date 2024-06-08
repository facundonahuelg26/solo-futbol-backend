import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PrismaService } from 'src/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { ENVS } from 'src/environments'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new UnauthorizedException('No token provided')
    }

    const token = authHeader.split(' ')[1]
    let decodedToken

    try {
      decodedToken = this.jwtService.verify(token)
    } catch (err) {
      throw new UnauthorizedException('Invalid token')
    }

    const user = await this.prisma.user.findUnique({
      where: { id: decodedToken.sub },
    })

    if (!user) {
      throw new UnauthorizedException('User not found')
    }
    console.log(user, ENVS.ADMIN_ROLE)
    if (user.role !== ENVS.ADMIN_ROLE) {
      throw new ForbiddenException('Access denied')
    }

    return true
  }
}
