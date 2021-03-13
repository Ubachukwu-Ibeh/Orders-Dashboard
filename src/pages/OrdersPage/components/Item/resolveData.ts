import { getRandom } from "../../../../utils/productGenerator";
import { getStorage } from "../../../../utils/localStorage";

const resolveData = (id: number) => {
  const itemObject = getStorage().selectedProducts[`item${id}`];
  if (!itemObject) return;

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
    ...itemObject,
    name: itemObject[Object.keys(itemObject)[0]].name,
    order_id: getRandom(1000, 30000),
    time: getRandom(0, 10),
    rating: `${getRandom(1, 4)}.${getRandom(0, 9)}`,

    total: totalPrice,

    profit: `$${getRandom(50, 500)}`,
    shipping: shipping,
    discount: totalDiscount,
    grandTotal: (totalPrice + shipping - totalDiscount).toFixed(2),
    profitPercentage: getRandom(20, 80)
  };
};
export default resolveData;
