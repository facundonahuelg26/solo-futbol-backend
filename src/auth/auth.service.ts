import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthUserDto } from 'src/auth/dto/auth-user.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async authUser(user: AuthUserDto) {
    const userExist = await this.prisma.user.findUnique({
      where: { email: user.email },
    })

    if (!userExist) {
      throw new NotFoundException('User not found')
    }
    if (userExist.password !== user.password) {
      throw new BadRequestException('Invalid credentials')
    }

    const payload = { sub: userExist.id, email: userExist.email }
    const token = await this.jwtService.signAsync(payload)

    // Verificar si el token de refresco ya existe para el usuario
    const existingRefreshToken = await this.prisma.refreshToken.findUnique({
      where: { userId: userExist.id },
    })

    if (existingRefreshToken) {
      // Si ya existe, actualizar el token
      await this.prisma.refreshToken.update({
        where: { userId: userExist.id },
        data: { token: token },
      })
    } else {
      // Si no existe, crear un nuevo token
      await this.prisma.refreshToken.create({
        data: {
          token: token,
          userId: userExist.id,
        },
      })
    }

    return {
      email: userExist.email,
      token: token,
    }
  }

  async refreshAuthToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken)

      // Busca el refreshToken en la tabla RefreshToken
      const refreshTokenData = await this.prisma.refreshToken.findFirst({
        where: {
          token: refreshToken,
          userId: decoded.sub,
        },
      })

      if (!refreshTokenData) {
        throw new BadRequestException('Invalid refresh token')
      }

      // Busca los datos del usuario asociados con el refreshToken
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.sub },
      })

      if (!user) {
        throw new BadRequestException('User not found')
      }

      // Verifica si el refreshToken coincide con el almacenado en la base de datos
      if (refreshTokenData.token !== refreshToken) {
        throw new BadRequestException('Invalid refresh token')
      }

      // Firmar un nuevo token de acceso
      const payload = { email: user.email }
      const newAccessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
      })

      return {
        accessToken: newAccessToken,
      }
    } catch (e) {
      throw new BadRequestException('Invalid refresh token')
    }
  }
}
