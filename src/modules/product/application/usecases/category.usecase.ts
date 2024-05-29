import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryCreateDTO } from '../../adapter/api/dto/category-create.dto';
import { CategoryDTO } from '../../adapter/api/dto/category.dto';
import { CategoryRepository } from '../../adapter/database/repositories/category.repository';
import { CategorySchema } from '../../adapter/database/schemas/category.schema';
import { ICategory } from '../domain/category';

@Injectable()
export class CategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(category: CategoryCreateDTO): Promise<CategorySchema> {
    const client = await this.categoryRepository.findByName(category.name);

    if (category.parentId) {
      const parentCategory = await this.categoryRepository.findById(category.parentId);

      if (!parentCategory) {
        throw new NotFoundException('Parent category not found');
      }
    }

    if (client) {
      throw new ConflictException(`Category '${category.name}' already exists`);
    }

    return this.categoryRepository.save(category);
  }

  async update(id: string, data: CategoryCreateDTO): Promise<CategorySchema> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.update(id, data);

    return this.categoryRepository.findById(id);
  }

  async remove(id: string | string): Promise<void> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (!category.parentId) {
      throw new BadRequestException('Cannot delete a root category');
    }

    return this.categoryRepository.deleteById(id);
  }

  async listTreeView(id?: string): Promise<ICategory[]> {
    const categories = await this.categoryRepository.list(id);

    if (id && categories.length) {
      return categories;
    }

    return this.filterChildCategory(categories, id);
  }

  private filterChildCategory(categories: CategorySchema[], rootId?: string): CategoryDTO[] {
    const treeView: CategoryDTO[] = [];

    categories.forEach((category) => {
      if ((!rootId && !category.parentId) || category.parentId === rootId) {
        treeView.push({
          ...category,
          subCategories: this.filterChildCategory(categories, category._id),
        });
      }
    });

    return treeView;
  }
}
