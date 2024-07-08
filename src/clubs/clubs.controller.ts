import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ClubsService } from './clubs.service'
import { CreateClubDto } from './dto/create-club.dto'
import { UpdateClubDto } from './dto/update-club.dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/guard/auth.guard'
import { AdminGuard } from 'src/users/guard/admin.guard'

const CLUBS = 'Clubs'

@Controller('clubs')
@ApiTags(CLUBS)
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @UseGuards(AuthGuard, AdminGuard)
  @ApiResponse({ status: 201, description: 'Club created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  create(@Body() createClubDto: CreateClubDto) {
    return this.clubsService.create(createClubDto)
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all clubs.' })
  @ApiResponse({ status: 404, description: 'Clubs not found.' })
  findAll() {
    return this.clubsService.findAll()
  }

  @Get('filter-by-brands')
  @ApiTags(`${CLUBS}/filter-by-brands?brands=brandId1,brandId2,brandId3`)
  @ApiResponse({
    status: 200,
    description: 'Filtered list of clubs by brands.',
  })
  @ApiResponse({ status: 404, description: 'Clubs not found.' })
  findClubsByBrands(@Query('brands') brands: string) {
    const delimiter = '-'
    const brandArray = brands.split(delimiter)
    return this.clubsService.findClubsByBrands(brandArray)
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Club details.' })
  @ApiResponse({ status: 404, description: 'Club not found.' })
  findOne(@Param('id') id: string) {
    return this.clubsService.findOne(id)
  }

  @UseGuards(AuthGuard, AdminGuard)
  @ApiResponse({ status: 200, description: 'Club updated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateClubDto: UpdateClubDto) {
    return this.clubsService.update(id, updateClubDto)
  }

  @UseGuards(AuthGuard, AdminGuard)
  @ApiResponse({ status: 200, description: 'Club deleted.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clubsService.remove(id)
  }
}
