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

// _curry 함수.
// function _curry(fn) {
//     return function (a) {
//         return function (b){
//             return fn(a, b);
//         }
//     }
// }

// _curry 함수 리팩토링
function _curry(fn) {
    return function (a, b) {
        return arguments.length == 2 ? fn(a, b) : function (b) {return fn(a, b);};
    }
}

function _curryr(fn) {
    return function (a, b) {
        return arguments.length == 2 ? fn(a, b) : function (b) {return fn(b, a);};
    }
}

// curryr 함수를 이용한 filter와 map
const _filterCurry = _curryr(_filter)
const _mapCurry = _curryr(_map);

// curry 함수를 이용한 add 함수
const add = _curry(function (a, b) {
    return a + b;
});

// _get 함수 만들기
function _get(obj, key) {
    return obj = null ? undefined : obj[key]; // 다형성을 높여줘서 에러를 처리하는 방법
}

// curryr 함수를 적용한 get 함수
const _getCurry = _curryr(function (obj, key) {
    return obj == null ? undefined : obj[key];
});

// _rest 함수 만들기 -> 리스트화 시켜주는 역할
const slice = Array.prototype.slice;
function _rest(list, num) {
    return slice.call(list, num || 1); // num 가 없으면 1로 시작한다.
}

// _reduce 함수 만들기
/* 기본 형태
function _reduce(list, iterator, memo) {
    _each(list, function (data) {
        memo = iterator(memo, data);
    });
    return memo;
}
 */

// memo 인자를 생략해도 작동될 수 있게 리팩토링
function _reduce(list, iterator, memo) {
    if (arguments.length == 2 ){
        memo = list[0];
        list = _rest(list); // array 형태가 아니여도, array 형태로 바꿔주는 코드
    }
    _each(list, function (data) {
        memo = iterator(memo, data)
    });
    return memo;
}

// _pipe 함수 만들기 -> _reduce 를 이용하여 만들 수 있다. 연속적으로 함수를 실행할 때 사용한다.
function _pipe() {
    let fns = arguments;
    return function (arg) {
        return _reduce(fns, function (arg, fn) {
            return fn(arg);
        }, arg);
    }
}

// _go 함수 만들기 -> pipe 함수의 일종이며, 즉시 실행되는 pipe 함수. pipe 함수에 인자를 추가한 것이다.
function _go(arg) {
    let fns = _rest(arguments); // 첫 번째 값을 제외해주는 코드
    return _pipe.apply(null, fns)(arg);
}

// _keys 함수 만들기 -> 객체에서 key만 추출하는 함수이며, null 이 들어와도 에러가 나지 않게 다형성을 높인 함수
function _is_object(obj) {
    return typeof obj == 'object' && !!obj;
}

function _keys(obj) {
    return _is_object(obj) ? Object.keys(obj) : [];
}

// _keys 함수를 응용하여 _each 함수 리팩토링 -> key value 가 들어와도 each 할 수 있다.
function _eachKeys(list, iterator) {
    const keys = _keys(list);
    for (let i = 0, len = keys.length; i < len; i++) {
        iterator(list[keys[i]]);
    }
    return list;
}