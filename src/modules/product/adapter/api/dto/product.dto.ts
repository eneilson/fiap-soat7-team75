import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { AbstractEntity } from '@/types/abstract-entity';
import { IIngredient, IProduct } from '@/modules/product/application/domain/product';
import { CategoryDTO } from './category.dto';

export class ProductDTO extends AbstractEntity implements IProduct {
  @ApiProperty({
    title: 'Category name',
    example: 'Lanche de picanha suina',
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    title: 'Category ID',
  })
  @Expose()
  @Type(() => CategoryDTO)
  category: CategoryDTO;

  @ApiProperty({
    title: 'Product description',
  })
  @Expose()
  description: string;

  @ApiProperty({
    title: 'Product personalizarion list',
  })
  @Exclude()
  additionals: IProduct[];

  @ApiProperty({
    title: 'Product ingredients list',
  })
  @Exclude()
  ingredients?: IIngredient[];

  @ApiProperty({
    title: 'Product price',
  })
  @Expose()
  price: number;
}
