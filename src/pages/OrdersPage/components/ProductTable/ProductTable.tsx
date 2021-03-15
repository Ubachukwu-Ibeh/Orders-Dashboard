import React, { useState, useEffect } from "react";
import generateProduct from "../../../../utils/productGenerator";
import { getStorage } from "../../../../utils/localStorage";
import Styles from "./style/ProductTable.module.scss";
import Product from "../Product/Product";
import {
  IProductData,
  IProductTableProps,
  IStore
} from "../../../../interfaces/interfaces";
import { useDispatch, createSelectorHook } from "react-redux";
import * as orderActionTypes from "../../../../actionTypes/orderActionTypes";

const useSelector = createSelectorHook<IStore>();

const ProductTable = (props: IProductTableProps) => {
  const { setIsOpen } = props;
  let [products, setProducts] = useState<Array<IProductData>>([]);
  const store = useSelector(state => state.orderReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const generatedProducts: Array<IProductData> = [];
    for (let i = 0; i < 10; i++) {
      generatedProducts.push(generateProduct());
    }
    setProducts(generatedProducts);
  }, [store.selectedProducts]);

  const finishOrder = (val?: boolean) => {
    setIsOpen(prev => !prev);

    if (val) {
      dispatch({
        type: orderActionTypes.CLEAR_PRESELECT,
        payload: { id: 0 }
      });
      return;
    }

    if (store.preSelect.length === 0) return;

    const getId = () => {
      const storage = getStorage();
      const selectedProducts =
        storage && Object.keys(storage.selectedProducts).slice(-1)[0];
      if (selectedProducts) {
        return Number(selectedProducts.slice(4)) + 1;
      } else {
        return 0;
      }
    };

    dispatch({
      type: orderActionTypes.ADD_PRODUCT,
      payload: {
        id: getId()
      }
    });
  };

  return (
    <div
      onClick={() => finishOrder(true)}
      className={Styles.black}
      style={{ display: products[0] ? "flex" : "none" }}>
      <div className={Styles.main} onClick={e => e.stopPropagation()}>
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
