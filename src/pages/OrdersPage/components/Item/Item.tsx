import React, { useState, useEffect, useContext } from "react";
import Styles from "./style/Item.module.scss";
import { IItemProps, IItemDisplay } from "../../../../interfaces/interfaces";
import { getRandom } from "../../../../utils/productGenerator";
import { OrdersContext } from "../Orders/Orders";
import Product from "../Product/Product";

const Item = (props: IItemProps) => {
  const { id } = props;
  const [itemData, setItemData] = useState<IItemDisplay>({});
  const ordersContext = useContext(OrdersContext);
  const itemObject = ordersContext.selectedProducts[`item${id}`];
  const {
    order_id,
    time,
    rating,
    total,
    profit,
    shipping,
    discount,
    grandTotal
  } = itemData;
  const [childerAreOpen, setChildrenAreOpen] = useState(false);

  const openChildren = () => {
    setChildrenAreOpen(!childerAreOpen);
  };
  useEffect(() => {
    const totalPrice = Object.keys(itemObject).reduce((prev, product) => {
      const price = itemObject[product].total;
      return Number((price + prev).toFixed(2));
    }, 0);
    const totalDiscount = Object.keys(itemObject).reduce((prev, product) => {
      const discount = itemObject[product].discount;
      return Number(
        ((discount / 100) * itemObject[product].price + prev).toFixed(2)
      );
    }, 0);
    const shipping = getRandom(10, 50);
    const data = {
      order_id: getRandom(1000, 30000),
      time: getRandom(0, 10),
      rating: [getRandom(1, 5), getRandom(0, 10)],

      total: totalPrice,

      profit: `$${getRandom(50, 500)}`,
      shipping: shipping,
      discount: totalDiscount,
      grandTotal: (totalPrice + shipping - totalDiscount).toFixed(2)
    };
    setItemData({ ...data });
  }, []);

  return (
    <>
      <tr className={Styles.main} onClick={() => openChildren()}>
        <td>
          <input
            type="checkbox"
            name=""
            id=""
            onClick={e => e.stopPropagation()}
          />
        </td>
        <td>{order_id}</td>
        <td>{time} min ago</td>
        <td>{rating && `${rating[0]}.${rating[1]}`}</td>
        <td>${total}</td>
        <td>{profit}</td>
        <td>
          <div className={Styles.status}>
            <p>
              unknown <span></span>
            </p>
          </div>
        </td>
        <td>
          <button onClick={e => e.stopPropagation()}>...</button>
        </td>
      </tr>
      {childerAreOpen ? (
        <>
          <tr>
            <td></td>
            <td colSpan={6}>
              <table
                cellPadding="0"
                cellSpacing="0"
                className={Styles.productsTable}>
                <tbody>
                  <tr className={Styles.productsHeader}>
                    <th>#</th>
                    <th>SKU</th>
                    <th>Name</th>

                    <th>Price</th>
                    <th>Qty</th>
                    <th>Disc</th>
                    <th>Total</th>
                  </tr>
                  {Object.keys(itemObject).map((product, index) => {
                    const prop = itemObject[product];
                    prop.hasBeenSelected = true;
                    return <Product key={`prod${index}`} {...prop} />;
                  })}
                  <tr className={Styles.orderSummary}></tr>
                  <tr className={Styles.orderSummary}>
                    <td colSpan={3}></td>
                    <td colSpan={3}>Subtotal</td>
                    <td colSpan={2}>${total}</td>
                  </tr>
                  <tr className={Styles.orderSummary}>
                    <td colSpan={3}></td>
                    <td colSpan={3}>Shipping</td>
                    <td colSpan={2}>${shipping}</td>
                  </tr>
                  <tr className={Styles.orderSummary}>
                    <td colSpan={3}></td>
                    <td colSpan={3}>Discount</td>
                    <td colSpan={2}>${discount}</td>
                  </tr>
                  <tr className={Styles.orderSummary}>
                    <td colSpan={3}></td>
                    <td colSpan={3}>Total</td>
                    <td colSpan={2}>${grandTotal}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default Item;
