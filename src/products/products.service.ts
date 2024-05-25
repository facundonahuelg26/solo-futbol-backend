import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateProductDto } from 'src/products/dto/create-products.dto'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getProducts() {
    return this.prisma.products.findMany()
  }

  createProduct(product: CreateProductDto) {
    return this.prisma.products.create({ data: product })
  }
}
