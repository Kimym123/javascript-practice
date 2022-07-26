import { Products } from "./listData.js";
import { reduce, add } from "./method.js";

const nums = [1, 2, 3, 4, 5];
let total = 0;
for (const n of nums) {
  total = total + n;
}
console.log(`기존 방법을 통한 reduce 형태의 방법 : `, total); // 15

console.log(`만들었던 reduce 함수를 이용한 방법 : `, reduce(add, 0, [1, 2, 3, 4, 5]));
console.log(`만들었던 reduce 함수를 이용한 방법 & acc 인자를 생략한 경우 : `, reduce(add, [1, 2, 3, 4, 5]));

// Products 객체를 이용
console.log(
  `reduce 함수를 이용하여 Products 객체에 적용 : `,
  reduce((totalPrice, Products) => totalPrice + Products.price, 0, Products)
);
