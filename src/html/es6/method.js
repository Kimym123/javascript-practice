export const map= (f, iterator) => {
  let res = [];
  for (const a of iterator) {
    res.push(f(a));
  }
  return res;
}