import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateProductDto } from 'src/products/dto/create-products.dto'
import { ProductsService } from 'src/products/products.service'

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @ApiTags('Products')
  @ApiResponse({ status: 200, description: 'Get all products.' })
  @Get()
  getProducts() {
    return this.productsService.getProducts()
  }

  @ApiTags('Products')
  @ApiResponse({ status: 201, description: 'Product created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product)
  }
}
