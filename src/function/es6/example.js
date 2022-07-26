import { Products } from "./listData.js";
import { filter, map, reduce, add, go, curryFilter, curryMap, curryReduce, pipe } from "./method.js";

console.log(
  `Products 객체를 map을 이용해 가격만 뽑은 결과 : `,
  map(p => p.price, Products)
);

console.log(
  `Products 객체를 map 과 filter 를 이용해 20000원 이하의 가격만 뽑은 결과 : `,
  map(p => p.price, filter(p => p.price < 20000, Products))
);

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

console.log(`------------------------------------`);

// curry 함수 등 응용할 수 있는 것을 전부 사용한 방법
go(
  Products,
  curryFilter(p => p.price < 20000),
  curryMap(p => p.price),
  curryReduce(add),
  console.log
);

go(
  Products,
  curryFilter(p => p.price >= 20000),
  curryMap(p => p.price),
  curryReduce(add),
  console.log
);

// 중복을 제거 하기
const totalPrice = pipe(
  curryMap(p => p.price),
  curryReduce(add),
)

go(
  Products,
  curryFilter(p => p.price < 20000),
  totalPrice,
  console.log
);

go(
  Products,
  curryFilter(p => p.price >= 20000),
  totalPrice,
  console.log
);

// 더 세련되게 리팩토링
const baseTotalPrice = predicate => pipe(
  curryFilter(predicate),
  totalPrice
);

go(
  Products,
  baseTotalPrice(p => p.price < 20000),
  console.log
);

go(
  Products,
  baseTotalPrice(p => p.price >= 20000),
  console.log
);
