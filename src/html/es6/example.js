import { Products } from "./listData.js";
import { filter, map, reduce } from "./method.js";

console.log(
  `Products 객체를 map을 이용해 가격만 뽑은 결과 : `,
  map(p => p.price, Products)
);

console.log(
  `Products 객체를 map 과 filter 를 이용해 20000원 이하의 가격만 뽑은 결과 : `,
  map(p => p.price, filter(p => p.price < 20000, Products))
);

const add = (a,b) => a + b;
console.log(
  '20000원 이하의 제품의 가격을 모두 더한 값 : ',
  reduce(
    add,
    map(p => p.price, filter(p => p.price < 20000, Products))
  )
);

console.log(
  '위 코드와 흐름만 다르지 같은 방법 : ',
  reduce(
    add,
    filter(price => price < 20000, map(p => p.price, Products))
  )
);