import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { toDTO } from '@/helpers/dto-mapper';
import { OrderDTO } from '../dto/order.dto';
import { OrderUseCase } from '@/modules/order/aplication/usecase/order.usecase';
import { OrderCreateDTO } from '../dto/order-create.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderUseCase: OrderUseCase) {}

  @Get('/queue')
  @ApiOperation({ summary: 'List all orders by date' })
  @ApiResponse({
    status: 200,
    description: 'Return the order with the specified document',
    type: [OrderDTO],
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: order with the specified document not found.',
  })
  async getQueue(): Promise<OrderDTO> {
    const order = await this.orderUseCase.getQueue();

    return toDTO(order, OrderDTO);
  }

  @Post()
  @ApiOperation({ summary: 'Create Order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
    type: OrderDTO,
  })
  async createCrient(@Body() data: OrderCreateDTO): Promise<OrderDTO> {
    return toDTO(await this.orderUseCase.create(data), OrderDTO);
  }
}
