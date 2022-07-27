import exp from "constants";

export const add = (a, b) => a + b;

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
};

export const reduce = (f, acc, iterator) => {
  if (!iterator) {
    // reduce 함수에서 acc 인자를 생략한 경우 iterator 배열의 첫번째 인자를 acc 변수에 넣어주는 과정이다.
    iterator = acc[Symbol.iterator]();
    acc = iterator.next().value;
  }
  for (const a of iterator) {
    acc = f(acc, a);
  }
  return acc;
};

export const go = (...args) => reduce((a, f) => f(a), args);

export const pipe =
  (...fs) =>
  (a) =>
    go(a, ...fs);

export const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);
// 인자가 2개 이상이면 즉시 실행, 2개 미만이라면, 함수를 다시 return 한 다음 이후에 받은 인자와 합쳐서 실행

/* curry 함수를 기존 함수에 덧씌우는 작업 */
export const curryMap = curry((f, iterator) => {
  let res = [];
  for (const a of iterator) {
    res.push(f(a));
  }
  return res;
});

export const curryFilter = curry((f, iterator) => {
  let res = [];
  for (const a of iterator) {
    if (f(a)) {
      res.push(a);
    }
  }
  return res;
});

export const curryReduce = curry((f, acc, iterator) => {
  if (!iterator) {
    iterator = acc[Symbol.iterator]();
    acc = iterator.next().value;
  }
  for (const a of iterator) {
    acc = f(acc, a);
  }
  return acc;
});
