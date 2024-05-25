import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastname: string
}
