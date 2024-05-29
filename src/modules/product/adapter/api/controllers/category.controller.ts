import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CategoryUseCase } from '@/modules/product/application/usecases/category.usecase';
import { CategoryDTO } from '../dto/category.dto';
import { toDTO } from '@/helpers/dto-mapper';
import { CategoryCreateDTO } from '../dto/category-create.dto';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryUseCase: CategoryUseCase) {}

  @Get()
  @ApiOperation({ summary: 'List all categories' })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    type: String,
    description: 'Find subcategories',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all categories from root',
    type: CategoryDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  async listCategories(@Query('categoryId') id: string): Promise<CategoryDTO[]> {
    return toDTO(await this.categoryUseCase.listTreeView(id), CategoryDTO);
  }

  @Post()
  @ApiOperation({ summary: 'Create Category' })
  @ApiResponse({
    status: 200,
    description: 'Category has been successfully created.',
    type: CategoryDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Conflict: Category with the same name already exists.',
  })
  async createCategory(@Body() data: CategoryCreateDTO): Promise<CategoryDTO> {
    return toDTO(await this.categoryUseCase.create(data), CategoryDTO);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update category by id' })
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiResponse({
    status: 200,
    type: CategoryDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  async updateCategory(@Body() data: CategoryCreateDTO, @Param('id') id: string): Promise<unknown> {
    return toDTO(await this.categoryUseCase.update(id, data), CategoryDTO);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete category by id' })
  @ApiResponse({
    status: 204,
    description: 'Category was deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  async deleteCategory(@Param('id') id: string): Promise<void> {
    await this.categoryUseCase.remove(id);
  }
}
