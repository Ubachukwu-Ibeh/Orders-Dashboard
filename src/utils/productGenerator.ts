import { IProductData } from "../interfaces/interfaces";
const randomString = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos porro vitae sapiente, molestiae magnam doloribus vel omnis ratione accusantium ducimus modi ut ab, adipisci quas non, rem vero! Expedita molestiae dicta dolores corrupti, vero porro doloribus rem ad ratione animi eos in sit consequuntur doloremque magnam. Hic aperiam adipisci repellat nobis quibusdam, sapiente perferendis natus explicabo quam nihil, animi impedit, rem quod. Fugiat iste inventore architecto, ipsum officiis dolorem praesentium minima voluptatum omnis voluptate eos mollitia veniam reiciendis non hic ducimus impedit nisi error sit culpa quaerat, laudantium harum blanditiis obcaecati. Debitis repudiandae quia saepe et ex labore sequi cum.`;

export const getRandom = (min: number, max: number): number => {
  return Math.ceil(Math.random() * (max - min) + min);
};

const generateProduct = (): IProductData => {
  const color = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(
    0,
    255
  )})`;

  const product_id = getRandom(1, 30000);

  const price = Number(getRandom(1, 1000).toFixed(2));

  const discount = getRandom(20, 70);

  const from = getRandom(0, randomString.length - 10);
  const name = randomString.slice(from, from + getRandom(10, 30));

  return {
    color: color,
    product_id: product_id,
    name: name,
    price: price,
    discount: discount,
    id: 0,
    hasBeenSelected: false,
    quantity: 1,
    total: price
  };
};
export default generateProduct;
