import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateBrandDto } from './dto/create-brand.dto'
import { UpdateBrandDto } from './dto/update-brand.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    return await this.prisma.brand.create({
      data: createBrandDto,
    })
  }

  async findAll() {
    return await this.prisma.brand.findMany()
  }

  async findOne(id: string) {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
    })
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`)
    }
    return brand
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = await this.prisma.brand.update({
      where: { id },
      data: updateBrandDto,
    })
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`)
    }
    return brand
  }

  async remove(id: string) {
    const brand = await this.prisma.brand.delete({
      where: { id },
    })
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`)
    }
    return brand
  }
}
