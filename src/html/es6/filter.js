import { Products } from "./listData.js";
import { filter } from "./method.js";

console.log(...filter(p => p.price < 20000, Products));
console.log(...filter(p => p.price >= 20000, Products));

console.log(filter(n => n % 2, [1, 2, 3, 4, 5, 6]));
console.log(filter(n => n % 2, function* () {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    yield 6;
  }()
));