import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class AuthUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string
}
