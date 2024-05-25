import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/guard/auth.guard'
import { RequestWithUser } from 'src/auth/types/request'
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto'
import { UpdateProfileDto } from 'src/profile/dto/update-profile.dto'
import { ProfileService } from 'src/profile/profile.service'

const PROFILE_TAG = 'Profile'

@Controller('profile')
@UseGuards(AuthGuard)
@ApiTags(PROFILE_TAG)
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @ApiResponse({ status: 200, description: 'Get profile user.' })
  @Get()
  async getProfile(@Req() req: RequestWithUser) {
    const userId = req.user.sub
    return this.profileService.getProfile(userId)
  }

  @ApiResponse({ status: 201, description: 'Profile created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  async createProfile(
    @Req() req: RequestWithUser,
    @Body() profileData: CreateProfileDto,
  ) {
    const userId = req.user.sub // Accede al userId desde el token decodificado
    return this.profileService.createProfile(userId, profileData)
  }

  @ApiResponse({ status: 200, description: 'Profile updated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Put()
  async updateProfile(
    @Req() req: RequestWithUser,
    @Body() profileData: UpdateProfileDto,
  ) {
    const userId = req.user?.sub
    return this.profileService.updateProfile(userId, profileData)
  }
}
