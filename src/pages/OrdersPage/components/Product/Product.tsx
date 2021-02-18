import React, { useState, useContext } from "react";
import { IProductData } from "../../../../interfaces/interfaces";
import Styles from "./style/Product.module.scss";
import { OrdersContext } from "../Orders/Orders";
import * as ordersActions from "../../../../actions/Orders_actions";

const Product: React.FC<IProductData> = props => {
  let [selected, setSelected] = useState(false);
  const ordersContext = useContext(OrdersContext);
  const { color, product_id, name, price, discount, id } = props;

  const handleSelect = () => {
    selected = !selected;
    setSelected(selected);

    if (selected) {
      ordersContext.dispatch({
        type: ordersActions.PRE_ADD_PRODUCT,
        payload: {
          id: id,
          productData: { ...props }
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

  return (
    <tr
      className={selected ? Styles.selected : undefined}
      onClick={() => handleSelect()}>
      <td>
        <div
          className={Styles.product_img}
          style={{ backgroundColor: color }}></div>
      </td>
      <td>{product_id}</td>
      <td>{name}</td>

      <td>{price}</td>
      <td>1x</td>
      <td>{discount}</td>
      <td>200</td>
    </tr>
  );
};
export default Product;
