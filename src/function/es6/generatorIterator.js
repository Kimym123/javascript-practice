/* 간단한 순회 관련 메소드. */
const list = [1, 2, 3];
for (const a of list) {
  console.log(a);
}

// arr
console.log("Arr -----------------");
const arr = [1, 2, 3];
for (const a of arr) {
  console.log(a);
}

// set
console.log("Set -----------------");
const set = new Set([1, 2, 3]);
for (const a of set) {
  console.log(a);
}

// map
console.log("Map -----------------");
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
for (const a of map) {
  console.log(a);
}
console.log(`keys 관련 메소드`);
for (const a of map.keys()) {
  console.log(a);
}
console.log(`values 관련 메소드`);
for (const a of map.values()) {
  console.log(a);
}
console.log(`entries 관련 메소드(key 와 value 를 entry 로 뽑아줌 : `);
for (const a of map.entries()) {
  console.log(a);
}

/*
  Symbol.iterator!!
  * 이터러블 : 이터레이터를 리턴하는 [Symbol.iterator] () 를 가진 값
  * 이터레이터 : { value, done } 객체를 리턴하는 next () 를 가진 값
  * 이터러블 / 이터레이터 프로토콜 : 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록 하는 규약
  * */

// 사용자 이터러블 객체
let range = {
  from: 1,
  to: 5,
};
range[Symbol.iterator] = function () {
  return {
    current: this.from,
    last: this.to,

    next() {
      if (this.current <= this.last) {
        return { value: this.current++, done: false };
      } else {
        return { done: true };
      }
    },
  };
};

/* 제너레이터/이터레이터
 * 제너레이터 : 이터레이터이자 이터러블을 생성하는 함수. -> 이터레이터를 리턴하는 함수
 *  */
function* generator() {
  yield 1;
  yield 2;
  yield 3;
  return 100; // 순회할 때 return 값은 순회되지 않는다.
}

let generatorIterator = generator(); // 제너레이터를 통해 이터레이터를 쉽게 만들 수 있다. & 이터레이터이자 이터러블이다.
console.log(generatorIterator.next());
console.log(generatorIterator.next());
console.log(generatorIterator.next());
console.log(generatorIterator.next());

for (const a of generator()) {
  // 이터레이터이자 이터러블이기 때문에 순회가 가능하다.
  console.log(`generator 의 for of 를 이용한 순회 : `, a);
}

function* infinity(i = 0) {
  while (true) yield i++;
}

function* limit(l, iterator) {
  for (const a of iterator) {
    yield a;
    if (a == l) return;
  }
}

// 홀수만 발생시키는 iterator 만들기
console.log(`홀수만 발생시키는 generator`);

function* odds(num) {
  // infinity 제너레이터와 limit 제너레이터를 이용한 코드드
  for (const a of limit(num, infinity(1))) {
    if (a % 2) yield a;
  }
}

console.log(`next()를 이용한 출력--------`);
let iterator2 = odds(20);
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());

console.log(`순회를 이용한 출력--------`);
for (const a of odds(20)) {
  console.log(a);
}

/* for of, 전개 연산자, 구조 분해, 나머지 연산자 -> 전부 이터러블 프로토콜을 따르고 있다. */

console.log(`전개 연산자 ---------------------`);
console.log("odds(10) 결과값 : ", ...odds(10));
console.log([...odds(10), ...odds(20)]);

console.log(`구조 분해 ---------------------`);
const [head, ...tail] = odds(20);
console.log("head 부분 : ", head);
console.log("전개 연산자 + tail 부분 : ", tail);

const [a, b, ...rest] = odds(20);
console.log("a 부분 : ", a);
console.log("b 부분 : ", b);
console.log("전개 연산자 + rest 부분 : ", rest);
