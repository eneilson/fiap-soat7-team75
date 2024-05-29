import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductSchema } from '../schemas/product.schema';
import { IProduct } from '@/modules/product/application/domain/product';

@Injectable()
export class ProductRepository {
  @InjectModel(ProductSchema.name)
  private readonly productModel: Model<ProductSchema>;

  save(data: IProduct): Promise<ProductSchema> {
    return this.productModel.create(data);
  }

  update(id: string, data: IProduct): Promise<ProductSchema> {
    return this.productModel.updateOne({ _id: id }, data).lean();
  }

  remove(data: IProduct): Promise<ProductSchema> {
    return this.productModel.create(data);
  }

  findById(_id: string): Promise<ProductSchema> {
    return this.productModel.findOne({ _id }).lean();
  }

  findByCategory(id: string): Promise<ProductSchema[]> {
    return this.productModel.find(id ? { 'category._id': id } : undefined).lean();
  }

  async deleteById(id: string | string): Promise<void> {
    await this.productModel.deleteOne({ _id: id });
  }
}
