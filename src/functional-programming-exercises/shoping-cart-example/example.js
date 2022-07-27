import { products } from "./dataList.js";
import { curry, curryMap, curryReduce, go } from "../function/es6/method.js";

const add = (a, b) => a + b;
const sum = curry((f, iterator) => go(iterator, curryMap(f), curryReduce(add)));

const totalQuantity = sum((p) => p.quantity);
const totalPrice = sum((p) => p.price * p.quantity);
