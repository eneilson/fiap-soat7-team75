import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrdersService } from '../services/order.service';
import { MockDTO } from '../dtos/mock.dto';

@ApiTags('order')
@Controller('products')
export class ProductsController {
  constructor(private readonly service: OrdersService) {}

  @Get()
  getProducts(): MockDTO[] {
    return [
      {
        hello: 'hello',
        world: 'world',
      },
      {
        hello: 'hello',
        world: 'world',
      },
      {
        hello: 'hello',
        world: 'world',
      },
    ];
  }
}
