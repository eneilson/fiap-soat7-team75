import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../../adapter/database/repositories/category.repository';

import { ProductRepository } from '../../adapter/database/repositories/product.repository';
import { ProductSchema } from '../../adapter/database/schemas/product.schema';
import { IProduct } from '../domain/product';
import { ProductCreateDTO } from '../../adapter/api/dto/product-create.dto';

@Injectable()
export class ProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(data: ProductCreateDTO): Promise<ProductSchema> {
    const category = await this.categoryRepository.findById(data.categoryId);

    if (!category) {
      throw new NotFoundException('Category was not found');
    }

    const product = {
      ...data,
      category,
    };

    return this.productRepository.save(product);
  }

  async update(id: string, data: IProduct): Promise<ProductSchema> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.update(id, data);

    return this.productRepository.findById(id);
  }

  async remove(id: string | string): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.productRepository.deleteById(id);
  }

  list(id?: string): Promise<IProduct[]> {
    return this.productRepository.findByCategory(id);
  }

  async findById(id?: string): Promise<IProduct> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
