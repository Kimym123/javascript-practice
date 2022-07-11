/*
_each 를 사용하지 않은 함수들.

// 1. _filter() 함수로 리팩토링
function _filter(list, predicate) { // 응용형(적용형, 고차) 함수. -> 함수를 인자로 받아서 원하는 시점에 평가를 실시하여 로직을 완료함.
    let newList = [];
    for (let i = 0; i < list.length; i++) {
        if (predicate(list[i])) {
            newList.push(list[i]);
        }
    }
    return newList;
}

// 2. _map() 함수로 리팩토링
function _map(list, mapper) {
    let newList = [];
    for (let i = 0; i < list.length; i++) {
        newList.push(mapper(list[i]));
    }
    return newList;
}

 */

// 반복을 하는 함수.
function _each(list, iterator) {
    for (let i = 0; i < list.length; i++) {
        iterator(list[i]);
    }
    return list;
}

// _each 를 사용한 filter 와 map 함수
function _filter(list, predicate) {
    const newList = [];
    _each(list, function (data) {
        if (predicate(data)) {
            newList.push(data);
        }
    });
    return newList;
}

function _map(list, mapper) {
    const newList = [];
    _each(list, function (data) {
        newList.push(mapper(data));
    });
    return newList;
}