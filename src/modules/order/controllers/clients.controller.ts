import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrdersService } from '../services/order.service';
import { MockDTO } from '../dtos/mock.dto';

@ApiTags('order')
@Controller('clients')
export class ClientsController {
  constructor(private readonly service: OrdersService) {}

  @Get()
  getIdentity(): MockDTO {
    return {
      hello: 'hello',
      world: 'world',
    };
  }
}
