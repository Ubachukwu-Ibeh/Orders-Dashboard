import React, { useState } from "react";
import { IProductData } from "../../../../interfaces/interfaces";
import Styles from "./style/Product.module.scss";
import * as orderActionTypes from "../../../../actionTypes/Orders_actionTypes";
import { useDispatch } from "react-redux";

const Product = (props: IProductData) => {
  let [selected, setSelected] = useState(false);
  const dispatch = useDispatch();

  const [productData, setProductData] = useState({ ...props });
  const [arrowsVisible, setArrowsVisible] = useState(false);
  const { id, hasBeenSelected } = productData;

  const setQuantity = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();

    if (!selected) handleSelect();

    const { quantity } = productData;

    if (action === "increase") {
      if (quantity === 10) return;
      productData.quantity += 1;
    } else if (action === "decrease") {
      if (quantity === 1) return;
      productData.quantity -= 1;
    }

    productData.total = productData.quantity * productData.price;

    dispatch({
      type: orderActionTypes.PRE_REPLACE_PRODUCT,
      payload: {
        id,
        productData
      }
    });

    setProductData({ ...productData });
  };

  const handleSelect = () => {
    if (hasBeenSelected) return;
    selected = !selected;
    setSelected(selected);

    if (selected) {
      dispatch({
        type: orderActionTypes.PRE_ADD_PRODUCT,
        payload: {
          id,
          productData
        }
      });
    } else {
      dispatch({
        type: orderActionTypes.PRE_REMOVE_PRODUCT,
        payload: {
          id
        }
      });
    }
  };

  const revealArrows = (value: boolean) => {
    if (hasBeenSelected) return;
    setArrowsVisible(value);
  };

  const handleSelectedStatus = () => {
    if (selected && !hasBeenSelected) {
      return Styles.selected;
    } else if (!selected && !hasBeenSelected) {
      return Styles.default;
    }
  };

  return (
    <tr
      className={handleSelectedStatus()}
      onClick={() => handleSelect()}
      onMouseEnter={() => revealArrows(true)}
      onMouseLeave={() => revealArrows(false)}>
      <td>
        <div
          className={Styles.product_img}
          style={{ backgroundColor: productData.color }}></div>
      </td>
      <td>{productData.product_id}</td>
      <td>{productData.name}</td>

      <td>${productData.price}</td>
      <td>
        <div className={Styles.quantity}>
          <p>{productData.quantity} x</p>
          {arrowsVisible && (
            <div>
              <p onClick={e => setQuantity(e, "increase")}>▲</p>
              <p onClick={e => setQuantity(e, "decrease")}>▼</p>
            </div>
          )}
        </div>
      </td>
      <td>{productData.discount}%</td>
      <td>${productData.total}</td>
    </tr>
  );
};
export default Product;
