import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { v4 } from 'uuid';
import { ICategory } from '@/modules/product/application/domain/category';

export class CategoryCreateDTO implements ICategory {
  @ApiProperty({
    title: 'Parent Category ID',
    type: 'string',
    example: v4(),
  })
  @Expose()
  @IsString()
  @IsOptional()
  parentId: string;

  @ApiProperty({
    title: 'Category name',
    example: 'Lanches (não) veganos',
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;
}
