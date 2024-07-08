import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/guard/auth.guard'
import { CreateProductDto } from 'src/products/dto/create-products.dto'
import { UpdateProductDto } from 'src/products/dto/update-products.dto'
import { ProductsService } from 'src/products/products.service'
import { AdminGuard } from 'src/users/guard/admin.guard'

const PRODUCTS = 'Products'
@Controller('products')
@ApiTags(PRODUCTS)
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @ApiResponse({ status: 200, description: 'Get all products.' })
  @Get()
  async getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 6,
    @Query('club') club?: string,
    @Query('brand') brand?: string[],
  ) {
    const pageNumber = parseInt(page as any, 10)
    const limitNumber = parseInt(limit as any, 10)
    const offset = (pageNumber - 1) * limitNumber

    const brandsArray = Array.isArray(brand) ? brand : brand ? [brand] : []
    const products = await this.productsService.getProducts(
      pageNumber,
      limitNumber,
      club,
      brandsArray,
    )
    const totalProducts = await this.productsService.getTotalProducts(
      club,
      brandsArray,
    )

    const dataProducts = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        images: product.images,
        description: product.description,
        price: product.price,
        href: product.href,
      }
    })

    const hasMore = totalProducts > offset + limitNumber

    return {
      products: dataProducts,
      total: totalProducts,
      page: pageNumber,
      limit: limitNumber,
      hasMore,
    }
  }

  @UseGuards(AuthGuard, AdminGuard)
  @ApiResponse({ status: 201, description: 'Product created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product)
  }

  @UseGuards(AuthGuard, AdminGuard)
  @ApiResponse({ status: 200, description: 'Product updated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: UpdateProductDto) {
    return this.productsService.updateProduct(id, product)
  }
}
