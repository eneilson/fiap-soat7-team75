import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from '@/helpers/environment';
import { ClientModule } from './client/client.module';
import { ProductsModule } from './product/products.module';
import { MockModule } from './app.mock.provider';
import { OrderModule } from './order/order.module';

@Module({
  providers: [],
  imports: [
    // App Modules
    ClientModule,
    ProductsModule,
    OrderModule,
    // Core Modules
    MongooseModule.forRoot(config.get('db.api'), {
      dbName: 'api-v1',
    }),
    // Mock data
    MockModule,
  ],
})
export class AppModule {}
