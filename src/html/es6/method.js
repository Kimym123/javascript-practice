import exp from "constants";

export const map = (f, iterator) => {
  let res = [];
  for (const a of iterator) {
    res.push(f(a));
  }
  return res;
};

export const filter = (f, iterator) => {
  let res = [];
  for (const a of iterator) {
    if (f(a)) {
      res.push(a);
    }
  }
  return res;
}

export const reduce = (f,acc, iterator) => {
  if (!iterator) { // reduce 함수에서 acc 인자를 생략한 경우 iterator 배열의 첫번째 인자를 acc 변수에 넣어주는 과정이다.
    iterator = acc[Symbol.iterator]();
    acc = iterator.next().value;
  }
  for (const a of iterator) {
    acc = f(acc, a);
  }
  return acc;
}