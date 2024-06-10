import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  ValidateNested,
  IsEnum,
  IsJSON,
} from 'class-validator'
import { Type } from 'class-transformer'

class Breadcrumb {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  href: string
}

class Image {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  src: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  alt: string
}

class Size {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  inStock: boolean
}

export enum Gender {
  Men = 'Men',
  Women = 'Women',
  Unisex = 'Unisex',
}

export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  href: string

  @ApiProperty({ type: [Breadcrumb] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Breadcrumb)
  @IsNotEmpty()
  breadcrumbs: Record<string, any>[]

  @ApiProperty({ type: [Image] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Image)
  @IsNotEmpty()
  images: Record<string, any>[]

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brand: string

  @ApiProperty({ type: [Size] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Size)
  @IsNotEmpty()
  sizes: Record<string, any>[]

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  highlights: string[]

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  details: string

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  team: string
}
