function deepEquality (obj1, obj2) {
    if (arguments.length != 2) {
        throw "Errer! Argument number incorrect.";
    }
    if (typeof(obj1) != 'object' || typeof(obj2) != 'object') {
        throw "Errer! Argument should be objects.";
    }
    
    if (obj1 === obj2) {
        return true;
    }
    let key1 = Object.keys(obj1);
    let key2 = Object.keys(obj2);
    if (key1.length != key2.length) {
        return false;
    }
    for (let element of key1) {
        if (typeof(obj1[element]) == 'object' && typeof(obj2[element]) == 'object') {
            if (!deepEquality(obj1[element], obj2[element])) {
                return false;
            }
        } else if (obj1[element] != obj2[element]) {
            return false;
        }
    }

    return true;
}

function uniqueElements (arr) {
    if (!Array.isArray(arr)) {
        throw "Argument should be array.";
    }

    let map = new Map();
    let count = 0;
    for (let each of arr) {
        count = map.get(each);
        if (count == undefined) {
            map.set(each, 1);
        } else {
            map.set(each, ++count);
        }
    }
    return map.size;
}

function countOfEachCharacterInString (str) {
    if (typeof(str) != 'string') {
        throw "Errer! Argument should be string.";
    }

    let charMap = {};
    let count = 0;
    for (let char of str) {
        count = charMap[char];
        if (count == undefined) {
            charMap[char] = 1;
        } else {
            charMap[char] = ++count;
        }
    }
    return charMap;
}

module.exports = {
    deepEquality,
    uniqueElements,
    countOfEachCharacterInString
}