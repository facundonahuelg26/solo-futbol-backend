import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
export class UpdateClubDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string
}
