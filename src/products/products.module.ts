import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProductsController } from 'src/products/products.controller'
import { ProductsService } from 'src/products/products.service'

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}
