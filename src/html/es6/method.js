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