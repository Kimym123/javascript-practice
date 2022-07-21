import { Products } from "./listData.js";
import { filter, reduce } from "./method.js";

const nums = [1, 2, 3, 4, 5];
let total = 0;
for (const n of nums) {
  total = total + n;
}
console.log(`기존 방법을 통한 reduce 형태의 방법 : `, total); // 15

const add = (a, b) => a + b;
console.log(`만들었던 reduce 함수를 이용한 방법 : `,  reduce(add, 0, [1, 2, 3, 4, 5]));
console.log(`만들었던 reduce 함수를 이용한 방법 & acc 인자를 생략한 경우 : `,  reduce(add, [1, 2, 3, 4, 5]));
