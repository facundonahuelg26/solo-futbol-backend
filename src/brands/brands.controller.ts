import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common'
import { BrandsService } from './brands.service'
import { CreateBrandDto } from './dto/create-brand.dto'
import { UpdateBrandDto } from './dto/update-brand.dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/guard/auth.guard'
import { AdminGuard } from 'src/users/guard/admin.guard'

const BRANDS = 'Brands'
@Controller('brands')
@ApiTags(BRANDS)
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @UseGuards(AuthGuard, AdminGuard)
  @ApiResponse({ status: 201, description: 'Brand created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto)
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all brands.' })
  @ApiResponse({ status: 404, description: 'Brands not found.' })
  findAll() {
    return this.brandsService.findAll()
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Brand details.' })
  @ApiResponse({ status: 404, description: 'Brand not found.' })
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(id)
  }

  @UseGuards(AuthGuard, AdminGuard)
  @ApiResponse({ status: 200, description: 'Brand updated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(id, updateBrandDto)
  }

  @UseGuards(AuthGuard, AdminGuard)
  @ApiResponse({ status: 200, description: 'Brand deleted.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(id)
  }
}
