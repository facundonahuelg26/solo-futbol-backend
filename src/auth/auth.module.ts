import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ENVS } from 'src/environments'
import { PrismaService } from 'src/prisma.service'
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: ENVS.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
