import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthUserDto } from 'src/auth/dto/auth-user.dto'
import { PrismaService } from 'src/prisma.service'
import * as bcrypt from 'bcrypt'
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
    const passwordValid = await bcrypt.compare(
      user.password,
      userExist.password,
    )
    if (!passwordValid) {
      throw new BadRequestException('Invalid credentials')
    }

    const payload = { sub: userExist.id, email: userExist.email }

    // Generar el token de acceso con una duración corta
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '40m',
    })

    // Generar el token de refresco con una duración más larga
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    })

    // Verificar si el token de refresco ya existe para el usuario
    const existingRefreshToken = await this.prisma.refreshToken.findUnique({
      where: { userId: userExist.id },
    })

    if (existingRefreshToken) {
      // Si ya existe, actualizar el token de refresco
      await this.prisma.refreshToken.update({
        where: { userId: userExist.id },
        data: { token: refreshToken },
      })
    } else {
      // Si no existe, crear un nuevo token de refresco
      await this.prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: userExist.id,
        },
      })
    }

    return {
      email: userExist.email,
      accessToken: token,
      refreshToken: refreshToken,
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
        console.log('estoy aca 1', refreshTokenData)
        throw new BadRequestException(
          'Invalid refresh token: Token not found in database',
        )
      }

      // Busca los datos del usuario asociados con el refreshToken
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.sub },
      })

      if (!user) {
        throw new BadRequestException('Invalid refresh token: User not found')
      }

      // Verifica si el refreshToken coincide con el almacenado en la base de datos
      if (refreshTokenData.token !== refreshToken) {
        console.log('estoy aca 2')
        throw new BadRequestException('Invalid refresh token: Token mismatch')
      }

      // Firmar un nuevo token de acceso
      const accessTokenPayload = { sub: user.id, email: user.email }
      const newAccessToken = await this.jwtService.signAsync(
        accessTokenPayload,
        {
          expiresIn: '40m',
        },
      )

      // Firmar un nuevo refreshToken
      const newRefreshTokenPayload = { sub: user.id, email: user.email }
      const newRefreshToken = await this.jwtService.signAsync(
        newRefreshTokenPayload,
        {
          expiresIn: '1d',
        },
      )

      // Actualizar el refreshToken en la base de datos
      await this.prisma.refreshToken.update({
        where: { userId: user.id },
        data: { token: newRefreshToken },
      })

      console.log('Tokens updated in DB, proceeding to return tokens')
      // Devolver tanto el nuevo accessToken como el nuevo refreshToken
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      }
    } catch (e) {
      console.error('Error refreshing auth token', e)

      throw new BadRequestException(`Invalid refresh token: ${e.message}`)
    }
  }
}
