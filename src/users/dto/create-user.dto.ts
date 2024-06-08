import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'
import { ENVS } from 'src/environments'

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastname?: string

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

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsIn([ENVS.ADMIN_ROLE, ENVS.USER_ROLE])
  role?: string = 'user'
}
