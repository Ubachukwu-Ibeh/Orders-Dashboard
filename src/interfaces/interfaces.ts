import { SetStateAction } from "react";

export interface IProductData {
  color: string;
  product_id: number;
  name: string;
  price: string;
  discount: string;
  id: number;
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
  total?: string;
  profit?: string;
  name?: string;
}
