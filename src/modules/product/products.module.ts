import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { CategoryController } from './adapter/api/controllers/category.controller';
import { ProductController } from './adapter/api/controllers/product.controller';
import { CategorySchema } from './adapter/database/schemas/category.schema';
import { CategoryUseCase } from './application/usecases/category.usecase';
import { ProductSchema } from './adapter/database/schemas/product.schema';
import { CategoryRepository } from './adapter/database/repositories/category.repository';
import { ProductRepository } from './adapter/database/repositories/product.repository';
import { ProductUseCase } from './application/usecases/product.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategorySchema.name, schema: SchemaFactory.createForClass(CategorySchema) },
      { name: ProductSchema.name, schema: SchemaFactory.createForClass(ProductSchema) },
    ]),
  ],
  controllers: [CategoryController, ProductController],
  providers: [CategoryUseCase, CategoryRepository, ProductRepository, ProductUseCase],
})
export class ProductsModule {}
