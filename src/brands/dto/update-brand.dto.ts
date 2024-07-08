import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
export class UpdateBrandDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string
}
