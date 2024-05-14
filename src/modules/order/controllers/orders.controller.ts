import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrdersService } from '../services/order.service';
import { MockDTO } from '../dtos/mock.dto';

@ApiTags('order')
@Controller('order')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Get(':id')
  getOrderById(): MockDTO {
    return {
      hello: 'hello',
      world: 'world',
    };
  }
}
