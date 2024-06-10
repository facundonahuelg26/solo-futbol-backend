import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateProductDto } from 'src/products/dto/create-products.dto'
import { UpdateProductDto } from 'src/products/dto/update-products.dto'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProducts(
    page: number,
    limit: number,
    team?: string,
    brand?: string,
  ) {
    const offset = (page - 1) * limit
    const where: any = {}

    if (team) {
      where.team = team
    }
    if (brand) {
      where.brand = brand
    }

    const products = await this.prisma.products.findMany({
      skip: offset,
      take: limit,
      where,
    })
    return products
  }

  async getTotalProducts(team?: string, brand?: string) {
    const where: any = {}

    if (team) {
      where.team = team
    }
    if (brand) {
      where.brand = brand
    }

    return this.prisma.products.count({ where })
  }

  createProduct(product: CreateProductDto) {
    return this.prisma.products.create({ data: product })
  }

  async updateProduct(id: string, product: UpdateProductDto) {
    return this.prisma.products.update({
      where: { id },
      data: product,
    })
  }
}
