import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductUseCase } from '@/modules/product/application/usecases/product.usecase';
import { toDTO } from '@/helpers/dto-mapper';
import { ProductDTO } from '../dto/product.dto';
import { ProductCreateDTO } from '../dto/product-create.dto';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Get Products detalis' })
  @ApiQuery({
    description: 'Find products by category',
    name: 'categoryId',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Return all products',
    type: [ProductDTO],
  })
  async getProducts(@Query('categoryId') categoryId: string): Promise<ProductDTO[]> {
    return toDTO(await this.productUseCase.list(categoryId), ProductDTO);
  }

  @Post()
  @ApiOperation({ summary: 'Create Product' })
  @ApiResponse({
    status: 200,
    description: 'Product has been successfully created.',
    type: ProductDTO,
  })
  async createProduct(@Body() data: ProductCreateDTO): Promise<ProductDTO> {
    return toDTO(await this.productUseCase.create(data), ProductDTO);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Product detalis' })
  @ApiParam({
    description: 'Find product by ID',
    name: 'id',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Return product detail',
    type: [ProductDTO],
  })
  async getProductById(@Param('id') productId: string): Promise<ProductDTO[]> {
    return toDTO(await this.productUseCase.findById(productId), ProductDTO);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update product by id',
    requestBody: {
      content: {
        a: {
          example: { data: { price: 15.89 } },
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    required: true,
    example: '4dafa302-73bd-420f-aaaa-eac58bef3a23',
  })
  @ApiResponse({
    status: 200,
    type: ProductDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  async updateProduct(
    @Param('id') id: string,
    @Body() data: ProductCreateDTO,
  ): Promise<ProductDTO> {
    return toDTO(await this.productUseCase.update(id, data), ProductDTO);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete product by id' })
  @ApiResponse({
    status: 204,
    description: 'Product was deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.productUseCase.remove(id);
  }
}
