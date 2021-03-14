import { SetStateAction } from "react";

export interface IItemProps {
  id: number;
}

export interface IProductData extends IItemProps {
  color: string;
  product_id: number;
  name: string;
  price: number;
  discount: number;
  hasBeenSelected: boolean;
  quantity: number;
  total: number;
}

interface IOrderActionPayload extends IItemProps {
  productData?: IProductData;
}

export interface IOrderAction {
  type: string;
  payload: IOrderActionPayload;
}

export interface IItem {
  [name: string]: IProductData;
}

interface ISelected {
  [name: string]: IItem;
}

export interface ISelectedProducts {
  preSelect: Array<IProductData>;
  selectedProducts: ISelected;
  dispatch: React.Dispatch<IOrderAction> | Function;
}

export interface IProductTableProps {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

export interface IItemDisplay {
  order_id?: number;
  time?: number;
  rating?: string;
  total?: number;
  profit?: string;
  name?: string;
  shipping?: number;
  discount?: number;
  grandTotal?: string;
  profitPercentage?: number;
}
