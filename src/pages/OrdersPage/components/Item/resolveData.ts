import { IItem } from "../../../../interfaces/interfaces";
import { getRandom } from "../../../../utils/productGenerator";
const resolveData = (itemObject: IItem) => {
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
  return {
    order_id: getRandom(1000, 30000),
    time: getRandom(0, 10),
    rating: [getRandom(1, 5), getRandom(0, 10)],

    total: totalPrice,

    profit: `$${getRandom(50, 500)}`,
    shipping: shipping,
    discount: totalDiscount,
    grandTotal: (totalPrice + shipping - totalDiscount).toFixed(2)
  };
};
export default resolveData;
