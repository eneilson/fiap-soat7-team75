import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { IProduct } from '@/modules/product/application/domain/product';

export class ProductCreateDTO implements IProduct {
  @ApiProperty({
    title: 'Product name',
    example: 'Lanche de picanha suina',
  })
  @Expose()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    title: 'Category ID',
    example: '185c6c26-1f0d-4ede-b36d-b44f239b979d',
  })
  @Expose()
  @IsOptional()
  categoryId: string;

  @ApiProperty({
    title: 'Product description',
    example: 'produto teste criação',
  })
  @Expose()
  @IsOptional()
  description: string;

  /*
  // next version

  @ApiProperty({
    title: 'Product personalization list',
  })
  @Transform(({ value }) => value || [])
  additionals: IProduct[];

  @ApiProperty({
    title: 'Product ingredients list',
  })
  @Transform(({ value }) => value || [])
  ingredients?: IIngredient[];
  */

  @ApiProperty({
    title: 'Product price',
    example: parseFloat((Math.random() * 20).toFixed(2)),
  })
  @Expose()
  @IsOptional()
  price: number;
}
