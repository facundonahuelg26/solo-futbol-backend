import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateClubDto } from './dto/create-club.dto'
import { UpdateClubDto } from './dto/update-club.dto'

@Injectable()
export class ClubsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClubDto: CreateClubDto) {
    return this.prisma.club.create({
      data: {
        name: createClubDto.name,
        // Agrega otras propiedades si las tienes
      },
    })
  }

  async findAll() {
    return this.prisma.club.findMany()
  }

  async findOne(id: string) {
    const club = await this.prisma.club.findUnique({
      where: { id },
    })

    if (!club) {
      throw new NotFoundException(`Club with ID ${id} not found`)
    }

    return club
  }

  async update(id: string, updateClubDto: UpdateClubDto) {
    const existingClub = await this.prisma.club.findUnique({
      where: { id },
    })

    if (!existingClub) {
      throw new NotFoundException(`Club with ID ${id} not found`)
    }

    return this.prisma.club.update({
      where: { id },
      data: updateClubDto,
    })
  }

  async remove(id: string) {
    const existingClub = await this.prisma.club.findUnique({
      where: { id },
    })

    if (!existingClub) {
      throw new NotFoundException(`Club with ID ${id} not found`)
    }

    return this.prisma.club.delete({
      where: { id },
    })
  }

  async findClubsByBrands(brands: string[]) {
    return this.prisma.club.findMany({
      where: {
        products: {
          some: {
            brandId: {
              in: brands,
            },
          },
        },
      },
    })
  }
}
