export enum UnitEnum {
  GRAM = 'gram',
  KILOGRAM = 'kilogram',
  UNIT = 'unit',
  SLICE = 'slice',
}

export interface IIngredient {
  name: string;
  quantity: string;
  unit: UnitEnum;
}

export interface IProduct {
  additionals?: Array<IAdditional>;
  categoryId?: string;
  description: string;
  ingredients?: Array<IIngredient>;
  name: string;
  price: number;
}

export type IAdditional = IProduct;
