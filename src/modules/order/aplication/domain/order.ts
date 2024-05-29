export interface IOrder {
  id?: string;
  client: IOrderClient;
  date: string;
  price: number;
  payment: IOrderPayment;
  products: IOrderProduct[];
}

export interface IOrderClient {
  id: string;
  name: number;
}

export interface IOrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrderPayment {
  id: string;
  type: string;
  qrCode: string;
}

export interface IOrderCreateProduct {
  id: string;
  quantity: number;
}
