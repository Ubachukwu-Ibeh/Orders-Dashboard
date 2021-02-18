import React, { useState, useEffect, useContext } from "react";
import Styles from "./style/Item.module.scss";
import { IItemProps, IItemDisplay } from "../../../../interfaces/interfaces";
import { getRandom } from "../../../../utils/productGenerator";
import { OrdersContext } from "../Orders/Orders";

const Item = (props: IItemProps) => {
  const { id } = props;
  const [itemData, setItemData] = useState<IItemDisplay>({});
  const orderContext = useContext(OrdersContext);
  const itemObject = orderContext.selectedProducts[`item${id}`];
  const { order_id, time, rating, total, profit } = itemData;

  useEffect(() => {
    const data = {
      order_id: getRandom(1000, 30000),
      time: getRandom(0, 10),
      rating: [getRandom(1, 5), getRandom(0, 10)],
      total: `$${Object.keys(itemObject).reduce((prev, product) => {
        const priceText = itemObject[product].price;
        return (Number(priceText.slice(-(priceText.length - 1))) + Number(prev))
          .toFixed(2)
          .toString();
      }, "0")}`,
      profit: `$${getRandom(50, 500)}`
    };
    setItemData({ ...data });
  }, []);

  return (
    <tr>
      <td>
        <input type="checkbox" name="" id="" />
      </td>
      <td>{order_id}</td>
      <td>{time} min ago</td>
      <td>{rating && `${rating[0]}.${rating[1]}`}</td>
      <td>{total}</td>
      <td>{profit}</td>
      <td>
        <div className={Styles.status}>
          <p>
            unknown <span></span>
          </p>
        </div>
      </td>
      <td>
        <button>...</button>
      </td>
    </tr>
  );
};
export default Item;
