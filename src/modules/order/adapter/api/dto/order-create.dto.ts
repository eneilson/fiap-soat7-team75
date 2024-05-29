import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import { IOrderCreateProduct } from '@/modules/order/aplication/domain/order';

export class OrderCreateDTO {
  @ApiProperty({
    example: '1e60b435-e02a-4d93-a860-f70e36766c57',
  })
  @IsNotEmpty()
  @Expose()
  clientId: string;

  @ApiProperty({
    example: [
      { id: '4dafa302-73bd-420f-aaaa-eac58bef3a23', quantity: 1 },
      { id: '5dafa302-73bd-420f-aaaa-eac58bef3a23', quantity: 2 },
    ],
  })
  @IsNotEmpty()
  @Expose()
  products: IOrderCreateProduct[];
}
