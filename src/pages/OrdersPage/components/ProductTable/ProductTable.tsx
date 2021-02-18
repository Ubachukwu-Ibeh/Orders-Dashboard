import React, { useState, useEffect, useContext } from "react";
import generateProduct from "../../../../utils/productGenerator";
import Styles from "./style/ProductTable.module.scss";
import Product from "../Product/Product";
import { OrdersContext } from "../Orders/Orders";
import {
  IProductData,
  IProductTableProps
} from "../../../../interfaces/interfaces";
import * as orderActions from "../../../../actions/Orders_actions";

const ProductTable = (props: IProductTableProps) => {
  const { setIsOpen } = props;
  const ordersContext = useContext(OrdersContext);
  let [products, setProducts] = useState<Array<IProductData>>([]);

  useEffect(() => {
    const generatedProducts: Array<IProductData> = [];
    for (let i = 0; i < 10; i++) {
      generatedProducts.push(generateProduct());
    }
    setProducts(generatedProducts);
  }, [ordersContext.selectedProducts]);

  const finishOrder = () => {
    setIsOpen(prev => !prev);

    if (ordersContext.preSelect.length === 0) return;
    ordersContext.dispatch({
      type: orderActions.ADD_PRODUCT,
      payload: {
        id: Object.keys(ordersContext.selectedProducts).length
      }
    });
  };

  return (
    <div
      className={Styles.black}
      style={{ display: products[0] ? "flex" : "none" }}>
      <div className={Styles.main}>
        <table cellSpacing="0" cellPadding="0">
          <tbody>
            <tr>
              <th>#</th>
              <th>SKU</th>
              <th>Name</th>

              <th>Price</th>
              <th>Qty</th>
              <th>Disc</th>
              <th>Total</th>
            </tr>
            {products.map((item, index) => {
              item.id = index;
              return <Product key={index} {...item} />;
            })}
          </tbody>
        </table>
        <div className={Styles.finishOrder}>
          <button onClick={() => finishOrder()}>Finish</button>
        </div>
      </div>
    </div>
  );
};
export default ProductTable;
