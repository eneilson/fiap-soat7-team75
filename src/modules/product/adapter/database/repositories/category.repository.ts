import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from '@/modules/product/application/domain/category';
import { CategorySchema } from '../schemas/category.schema';

@Injectable()
export class CategoryRepository {
  @InjectModel(CategorySchema.name)
  private readonly categoryModel: Model<CategorySchema>;

  save(categoryDto: ICategory): Promise<CategorySchema> {
    return this.categoryModel.create(categoryDto);
  }

  findById(id: string | string): Promise<CategorySchema> {
    return this.categoryModel.findOne({ _id: id });
  }

  findByName(name: string): Promise<CategorySchema> {
    return this.categoryModel.findOne({
      name,
    });
  }

  update(id: string, category: Partial<CategorySchema>): Promise<CategorySchema> {
    return this.categoryModel.updateOne({ _id: id }, category).lean();
  }

  deleteById(categoryID: string | string): Promise<void> {
    return this.categoryModel.findByIdAndDelete(categoryID);
  }

  list(id?: string): Promise<CategorySchema[]> {
    return this.categoryModel
      .find(id ? { $or: [{ _id: id }, { parentId: id }] } : undefined)
      .lean();
  }
}
