import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule, SchemaFactory, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategorySchema } from './product/adapter/database/schemas/category.schema';
import { ProductSchema } from './product/adapter/database/schemas/product.schema';
import { ClientSchema } from './client/adapter/database/schemas/client.schema';
import { OrderSchema } from './order/adapter/database/schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategorySchema.name, schema: SchemaFactory.createForClass(CategorySchema) },
      { name: ProductSchema.name, schema: SchemaFactory.createForClass(ProductSchema) },
      { name: ClientSchema.name, schema: SchemaFactory.createForClass(ClientSchema) },
      { name: OrderSchema.name, schema: SchemaFactory.createForClass(OrderSchema) },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class MockModule implements OnModuleInit {
  @InjectModel(CategorySchema.name)
  private readonly categoryModel: Model<CategorySchema>;

  @InjectModel(ProductSchema.name)
  private readonly productModel: Model<ProductSchema>;

  @InjectModel(ClientSchema.name)
  private readonly clientModel: Model<ClientSchema>;

  @InjectModel(OrderSchema.name)
  private readonly orderModel: Model<OrderSchema>;

  async onModuleInit(): Promise<void> {
    console.log('Inserting mock...');
    // Mock for development -> TODO: create migration
    await this.clientModel.deleteOne({ _id: '1e60b435-e02a-4d93-a860-f70e36766c57' });
    await this.clientModel.create({
      _id: '1e60b435-e02a-4d93-a860-f70e36766c57',
      name: 'Hélio Musque',
      document: '161.332.245-33',
      documentType: 'CPF',
      address: {
        zip: '01001-000',
        number: 'Rua Sé',
      },
      phone: '+5519987654321',
      email: 'chefe@conexaoestrelar.com.br',
      allowNotification: true,
    });

    // categories
    await this.categoryModel.deleteMany({
      $or: [
        { _id: '185c6c26-1f0d-4ede-b36d-b44f239b979d' },
        { _id: '34056097-8ae4-481b-9788-99e0f64bb04e' },
        { _id: 'f9665fbd-edf4-48da-b8b1-0680ce03b9ab' },
        { _id: '4efc6e5c-d268-4899-a314-16a72760b662' },
        { _id: 'f8af6941-7d5e-4f36-88c2-e7de63f430cd' },
        { _id: '13b0191d-8ba4-476e-8ef6-99ed9c912125' },
      ],
    });
    await this.categoryModel.insertMany([
      {
        _id: '185c6c26-1f0d-4ede-b36d-b44f239b979d',
        name: 'Lanches',
      },
      {
        _id: '34056097-8ae4-481b-9788-99e0f64bb04e',
        name: 'Acompanhamentos',
      },
      {
        _id: 'f9665fbd-edf4-48da-b8b1-0680ce03b9ab',
        name: 'Bebidas',
      },
      {
        _id: '4efc6e5c-d268-4899-a314-16a72760b662',
        name: 'Sobremesas',
      },
    ]);

    await this.categoryModel.insertMany([
      {
        _id: 'f8af6941-7d5e-4f36-88c2-e7de63f430cd',
        parentId: '185c6c26-1f0d-4ede-b36d-b44f239b979d',
        name: 'Não veganos',
      },
      {
        _id: '13b0191d-8ba4-476e-8ef6-99ed9c912125',
        parentId: '185c6c26-1f0d-4ede-b36d-b44f239b979d',
        name: 'Nenhum pouco veganos',
      },
    ]);

    // products
    await this.productModel.deleteMany({
      $or: [
        { _id: '4dafa302-73bd-420f-aaaa-eac58bef3a23' },
        { _id: '5dafa302-73bd-420f-aaaa-eac58bef3a23' },
      ],
    });
    await this.productModel.insertMany([
      {
        _id: '4dafa302-73bd-420f-aaaa-eac58bef3a23',
        name: 'Lanches de picanha suina',
        categoryId: '185c6c26-1f0d-4ede-b36d-b44f239b979d',
        description: 'produto teste criação',
        price: 19.9,
      },
      {
        _id: '5dafa302-73bd-420f-aaaa-eac58bef3a23',
        name: 'Coquinha gelada',
        categoryId: 'f9665fbd-edf4-48da-b8b1-0680ce03b9ab',
        description: 'produto teste criação',
        price: 19.9,
      },
    ]);

    // order
    await this.clientModel.deleteOne({ _id: '4dafa302-73bd-420f-aaaa-eac58bef3a23' });
    await this.orderModel.insertMany([
      {
        client: {
          id: '1e60b435-e02a-4d93-a860-f70e36766c57',
          name: 'Helio Musque',
        },
        date: '2024-01-01T00:00:00.000Z',
        products: {
          id: '8b62ee95-d4e7-422b-bf5c-f9f6d7a48bc4',
          name: 'product name',
          price: 0.99,
          quantity: 2,
        },
        price: 1.99,
        payment: {
          id: 'f51255ab-8c4b-433e-a634-a748c6544c8e',
          qrCode: 'https://eneilson.com/payment/f51255ab-8c4b-433e-a634-a748c6544c8e',
          type: 'mock',
        },
      },
    ]);

    console.log('Inserting mock... done!');
  }
}
