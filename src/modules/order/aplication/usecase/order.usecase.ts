import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { v4 } from 'uuid';
import { OrderRepository } from '../../adapter/database/repositories/order.repository';
import { OrderSchema } from '../../adapter/database/schemas/order.schema';
import { OrderCreateDTO } from '../../adapter/api/dto/order-create.dto';

@Injectable()
export class OrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly http: HttpService,
  ) {}

  async create(data: OrderCreateDTO): Promise<OrderSchema> {
    const products = (
      await Promise.all(
        data.products.map(({ id }) =>
          firstValueFrom(this.http.get(`http://localhost:3000/product/${id}`)),
        ),
      )
    ).map((response) => response.data.data);
    const price = parseFloat(
      products
        .reduce((acc, item, index) => acc + item.price * data.products[index].quantity, 0)
        .toFixed(2),
    );

    const client = (
      await firstValueFrom(this.http.get(`http://localhost:3000/client/${data.clientId}`))
    ).data.data;

    const paymentId = v4();

    return this.orderRepository.create({
      client,
      products,
      price,
      date: new Date().toISOString(),
      payment: {
        id: paymentId,
        type: 'mock',
        qrCode: `https://eneilson.com/payment/${paymentId}`,
      },
    });
  }

  getQueue(): Promise<OrderSchema[]> {
    return this.orderRepository.getQueue();
  }
}
