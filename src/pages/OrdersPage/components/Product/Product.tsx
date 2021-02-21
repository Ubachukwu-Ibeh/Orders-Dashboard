import React, { useState, useContext } from "react";
import { IProductData } from "../../../../interfaces/interfaces";
import Styles from "./style/Product.module.scss";
import { OrdersContext } from "../Orders/Orders";
import * as ordersActions from "../../../../actions/Orders_actions";

const Product: React.FC<IProductData> = props => {
  let [selected, setSelected] = useState(false);
  const ordersContext = useContext(OrdersContext);
  const [productData, setProductData] = useState({ ...props });
  const [arrowsVisible, setArrowsVisible] = useState(false);
  const {
    color,
    product_id,
    name,
    price,
    discount,
    id,
    hasBeenSelected,
    quantity,
    total
  } = productData;

  const setQuantity = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    const { quantity } = productData;
    if (action === "increase") {
      if (quantity === 10) return;
      productData.quantity += 1;
    } else if (action === "decrease") {
      if (quantity === 1) return;
      productData.quantity -= 1;
    }
    productData.total = productData.quantity * productData.price;
    setProductData({ ...productData });
  };

  const handleSelect = () => {
    if (hasBeenSelected) return;
    selected = !selected;
    setSelected(selected);

    if (selected) {
      ordersContext.dispatch({
        type: ordersActions.PRE_ADD_PRODUCT,
        payload: {
          id: id,
          productData: { ...productData }
        }
      });
    } else {
      ordersContext.dispatch({
        type: ordersActions.PRE_REMOVE_PRODUCT,
        payload: {
          id: id
        }
      });
    }
  };

  const revealArrows = () => {
    if (hasBeenSelected) return;
    setArrowsVisible(true);
  };
  const hideArrows = () => {
    if (hasBeenSelected) return;
    setArrowsVisible(false);
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
      onMouseOver={() => revealArrows()}
      onMouseLeave={() => hideArrows()}>
      <td>
        <div
          className={Styles.product_img}
          style={{ backgroundColor: color }}></div>
      </td>
      <td>{product_id}</td>
      <td>{name}</td>

      <td>${price}</td>
      <td>
        <div className={Styles.quantity}>
          <p>{quantity} x</p>
          {arrowsVisible ? (
            <div>
              <p onClick={e => setQuantity(e, "increase")}>▲</p>
              <p onClick={e => setQuantity(e, "decrease")}>▼</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </td>
      <td>{discount}%</td>
      <td>${total}</td>
    </tr>
  );
};
export default Product;
