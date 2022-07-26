import { Products } from "./listData.js";
import { map } from "./method.js";
/*
 * map
 * */

let names = [];
for (const n of Products) {
  names.push(n.name);
}
console.log(`단순 반복문 사용 : `, names);

let prices = [];
for (const p of Products) {
  prices.push(p.price);
}
console.log(`단순 반복문 사용 : `, prices);

console.log(`\n`);

// method 의 Map 함수 사용
console.log(
  `Map 함수를 사용 : `,
  map((p) => p.name, Products)
);
console.log(
  `Map 함수를 사용 : `,
  map((p) => p.price, Products)
);

// Map 함수는 이터러블 프로토콜을 따르기 다형성이 늘어났다. -> 배열 이외에서도 사용가능.
function *generator() {
  yield 2;
  yield 3;
  yield 4;
}

// console.log(generator().map(a => a + 1)); generator 함수는 배열이 아니기 때문에 오류 발생.
console.log(map(a => a + 1, generator())); // generator 함수는 이터레이터이기 때문에 다형성을 높인 Map 함수로 사용 가능


// Map 함수는 map 자료형에도 사용이 가능하다.
let m = new Map();
m.set('a', 10);
m.set('b', 20);
console.log(new Map (map(([k, v]) => [k, v * 2], m))); // map 함수를 통해 기존에 생성한 Map 객체 m을 조작하여 새로운 Map 객체를 생성.