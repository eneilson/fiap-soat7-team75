import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ICategory } from '@/modules/product/application/domain/category';
import { AbstractEntity } from '@/types/abstract-entity';

export class CategoryDTO extends AbstractEntity implements ICategory {
  @ApiProperty({
    title: 'Category name',
    example: 'Lanches (não) veganos',
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    title: 'Subcategories name',
  })
  @Expose()
  @Type(() => CategoryDTO)
  @Transform(({ value }) => (value?.length ? value : undefined))
  subCategories: CategoryDTO[];
}
