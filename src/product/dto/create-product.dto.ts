import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from '../../category/dto/create-category.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` }) // ๐ use ApiProperty
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty() // ๐ use ApiProperty
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty() // ๐ use ApiProperty
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty() // ๐ use ApiProperty
  readonly image: string;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty()
  readonly category: CreateCategoryDto;

  @IsNotEmpty()
  @IsMongoId()
  readonly brand: string;
}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number; // Cantidad de registros por pรกgina

  @IsOptional()
  @Min(0) //minimo debe tener valores cero en adelante
  offset: number; // Nรบmero de registros a ignorar

  @IsOptional()
  @Min(0)
  minPrice: number; // ๐ new field

  @ValidateIf((params) => params.minPrice) //va ser obligatorio su existe un minPrice
  @IsPositive()
  maxPrice: number; // ๐ new field
}
