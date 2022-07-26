import { Products } from "./listData.js";
import { filter, reduce, add, map, go, curry, curryFilter, curryMap, curryReduce, pipe } from "./method.js";

go(
  0,
  a => a + 1,
  a => a + 10,
  a => a + 100,
  console.log
);

const f = pipe(
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100
);

console.log(f(0));

console.log(
  reduce(
    add,
    map(
      (p) => p.price,
      filter((p) => p.price < 20000, Products)
    )
  )
);

// 위에 함수를 go 함수를 통해 리팩토링 -> 코드량은 많아졌지만, 가독성이 좋아졌다.
/*
* 설명, Products 객체를 가지고, filter 함수를 이용해서 가격이 2만원 이하인 것을 필터링하고,
* 그 값을, map 함수를 통해서 필요한 값인 가격들만 뽑고,
* 뽑은 값을, reduce 함수와 add 함수를 통해서 다 더해준 값을 출력함.
* */
go(
  Products,
  Products => filter(p => p.price < 20000, Products),
  Products => map(p => p.price, Products),
  prices => reduce(add, prices),
  console.log
);

// 커리 사용법
const mult = curry((a,b) => a * b);
console.log(`인자가 하나이기 때문에 함수를 리턴한다 : `,mult(1));
console.log(`인자가 두 개 이상이기 때문에 결과를 리턴한다 : `,mult(4, 5)); // 20
console.log(`인자가 두 개 이상이기 때문에 결과를 리턴한다 : `,mult(4)(5)); // 20

const mult3 = mult(3);
console.log(mult3(10)); // 30
console.log(mult3(5)); // 15

// 커리를 이용한 리팩토링(method 함수 또한 curry 함수화 시켰음.)
go(
  Products,
  Products => curryFilter(p => p.price < 20000)(Products),
  Products => curryMap(p => p.price)(Products),
  prices => curryReduce(add)(prices),
  console.log
);

go(
  Products,
  curryFilter(p => p.price < 20000),
  curryMap(p => p.price),
  curryReduce(add),
  console.log
);

/*
* go 함수를 통해서 함수를 뒤집어 가독성을 향상시키고,
* curry 함수를 통해서 간결하게 해주었다.
* */