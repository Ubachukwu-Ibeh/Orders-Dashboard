import { SetStateAction } from "react";

export interface IProductData {
  color: string;
  product_id: number;
  name: string;
  price: number;
  discount: number;
  id: number;
  hasBeenSelected: boolean;
  quantity: number;
  total: number;
}
interface IOrderActionPayload {
  id: number;
  productData?: IProductData;
}
export interface IOrderAction {
  type: string;
  payload: IOrderActionPayload;
}
interface ISelected {
  [name: string]: IItem;
}
interface IItem {
  [name: string]: IProductData;
}
export interface ISelectedProducts {
  preSelect: Array<IProductData>;
  selectedProducts: ISelected;
  dispatch: React.Dispatch<IOrderAction> | Function;
}
export interface IProductTableProps {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}
export interface IItemProps {
  id: number;
}
export interface IItemDisplay {
  order_id?: number;
  time?: number;
  rating?: Array<number>;
  total?: number;
  profit?: string;
  name?: string;
  shipping?: number;
  discount?: number;
  grandTotal?: string;
}
