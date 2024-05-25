import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}
  async getProfile(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId: userId },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    })

    if (!profile) {
      throw new NotFoundException('Profile not found')
    }

    return {
      id: profile.id,
      name: profile.name,
      lastname: profile.lastname,
      email: profile.user.email,
    }
  }
  async createProfile(
    userId: string,
    profileData: { name: string; lastname: string },
  ) {
    // Verificar si el perfil ya existe
    const existingProfile = await this.prisma.profile.findUnique({
      where: { userId: userId },
    })

    if (existingProfile) {
      throw new BadRequestException('Profile already exists')
    }

    // Crear un nuevo perfil
    const profile = await this.prisma.profile.create({
      data: {
        userId: userId,
        name: profileData.name,
        lastname: profileData.lastname,
      },
    })

    return profile
  }

  async updateProfile(
    userId: string,
    profileData: { name?: string; lastname?: string },
  ) {
    // Verificar si el perfil existe
    const existingProfile = await this.prisma.profile.findUnique({
      where: { userId: userId },
    })

    if (!existingProfile) {
      throw new NotFoundException('Profile not found')
    }

    // Actualizar el perfil existente
    const updatedProfile = await this.prisma.profile.update({
      where: { userId: userId },
      data: {
        name: profileData.name,
        lastname: profileData.lastname,
      },
    })

    return updatedProfile
  }
}
