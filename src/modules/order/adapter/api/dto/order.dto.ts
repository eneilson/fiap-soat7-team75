import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Expose } from 'class-transformer';

import { v4 } from 'uuid';
import { AbstractEntity } from '@/types/abstract-entity';
import {
  IOrder,
  IOrderClient,
  IOrderPayment,
  IOrderProduct,
} from '@/modules/order/aplication/domain/order';

export class OrderDTO extends AbstractEntity implements IOrder {
  @ApiProperty({
    example: { id: '1e60b435-e02a-4d93-a860-f70e36766c57', name: 'Helio Musque' },
  })
  @IsNotEmpty()
  @Expose()
  client: IOrderClient;

  @ApiProperty({
    example: new Date().toISOString(),
  })
  @Expose()
  date: string;

  @ApiProperty({
    example: {
      id: v4(),
      name: 'product name',
      price: 0.99,
      quantity: 2,
    },
  })
  @Expose()
  products: IOrderProduct[];

  @ApiProperty({
    example: 1.99,
  })
  @Expose()
  price: number;

  @ApiProperty({
    example: {
      id: v4(),
      type: 'mock',
      qrCode: 'url://',
    },
  })
  @Expose()
  payment: IOrderPayment;
}
