import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  // name: string
  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  // lastname: string
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
