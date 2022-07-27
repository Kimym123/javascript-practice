import {
  curry,
  curryMap,
  curryReduce,
  go,
  pipe,
} from "../function/es6/method.js";
import { products } from "./dataList.js";

const add = (a, b) => a + b;

const totalQuantity = pipe(
  curryMap((p) => p.quantity),
  curryReduce(add)
);

const totalPrice = pipe(
  curryMap((p) => p.price * p.quantity),
  curryReduce(add)
);

console.log(
  `추상화를 하지 않고, 객체 p 에 종속된 형태 : `,
  totalQuantity(products)
);

console.log(
  `추상화를 하지 않고, 객체 p 에 종속된 형태 : `,
  totalPrice(products)
);

// 추상화를 하여 sum 이란 함수를 사용한 함수
const sum = (f, iterable) => go(iterable, curryMap(f), curryReduce(add));

const sumTotalQuantity = (data) => sum((p) => p.price, data);
const sumTotalPrice = (data) => sum((p) => p.price * p.quantity, data);

console.log(
  `추상화를 하여, 어떠한 객체에도 종속되지 않은 형태 : `,
  sumTotalQuantity(products)
);
console.log(
  `추상화를 하여, 어떠한 객체에도 종속되지 않은 형태 : `,
  sumTotalPrice(products)
);

// curry 함수를 이용하여 간결화
const currySum = curry((f, iterable) =>
  go(iterable, curryMap(f), curryReduce(add))
);

const currySumTotalQuantity = currySum((p) => p.quantity);
const currySumTotalPrice = currySum((p) => p.price * p.quantity);

console.log(`가장 간결한 코드 : `, currySumTotalQuantity(products));
console.log(`가장 간결한 코드 : `, currySumTotalPrice(products));

/* 추상화를 했기 때문에, 다양한 data 객체에서 사용이 가능하다. */
console.log(
  `currySum 함수에 다른 객체를 사용 : `,
  currySum((u) => u.age, [{ age: 30 }, { age: 20 }, { age: 10 }])
);
