import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
export class CreateClubDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string
}
