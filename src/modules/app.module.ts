import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderModule } from './order/order.module';
import { config } from '@/helpers/environment';

console.log(config.get('db.api'));
console.log(config.get('db.api'));
console.log(config.get('db.api'));
console.log(config.get('db.api'));
console.log(config.get('db.api'));
console.log(config.get('db.api'));
console.log(config.get('db.api'));
console.log(config.get('db.api'));
console.log(config.get('db.api'));
console.log(config.get('db.api'));

@Module({
  providers: [],
  imports: [
    // App Modules
    OrderModule,
    // Core Modules
    MongooseModule.forRoot(config.get('db.api')),
  ],
})
export class AppModule {}
