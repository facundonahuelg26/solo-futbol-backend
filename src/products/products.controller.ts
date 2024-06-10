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

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @ApiTags('Products')
  @ApiResponse({ status: 200, description: 'Get all products.' })
  @Get()
  async getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 6,
    @Query('team') team?: string,
    @Query('brand') brand?: string,
  ) {
    const pageNumber = parseInt(page as any, 10)
    const limitNumber = parseInt(limit as any, 10)
    const offset = (page - 1) * limit
    const products = await this.productsService.getProducts(
      pageNumber,
      limitNumber,
      team,
      brand,
    )
    const totalProducts = await this.productsService.getTotalProducts(
      team,
      brand,
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

    const hasMore = totalProducts > offset + limit

    return {
      products: dataProducts,
      total: totalProducts,
      page,
      limit,
      hasMore,
    }
  }

  @ApiTags('Products')
  @UseGuards(AuthGuard, AdminGuard)
  @ApiResponse({ status: 201, description: 'Product created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product)
  }

  @ApiTags('Products')
  @UseGuards(AuthGuard, AdminGuard)
  @ApiResponse({ status: 200, description: 'Product updated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: UpdateProductDto) {
    return this.productsService.updateProduct(id, product)
  }
}
