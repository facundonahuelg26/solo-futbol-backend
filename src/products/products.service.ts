import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateProductDto } from 'src/products/dto/create-products.dto'
import { UpdateProductDto } from 'src/products/dto/update-products.dto'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProducts(page: number, limit: number) {
    const offset = (page - 1) * limit
    const products = await this.prisma.products.findMany({
      skip: offset,
      take: limit,
    })
    return products
  }

  async getTotalProducts() {
    return this.prisma.products.count()
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
