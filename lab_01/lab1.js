const questionOne = function questionOne(arr) {
    // Implement question 1 here
    let sum = 0;
    arr.forEach(value => {
        sum += value * value;
    });
    return sum;
}

const questionTwo = function questionTwo(num) { 
    // Implement question 2 here
    if (num === 1 || num === 0) return num;
    return questionTwo (num-1) + questionTwo (num-2);
}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    let vowels = ['a','e','i','o','u','A','E','I','O','U'];
    let count = 0;
    
    for (let char of text) {
        let flag = vowels.find(vowel => {
            return vowel == char;
        });
        if (flag) count++;
    }
    return count;
}

const questionFour = function questionFour(num) {
    // Implement question 4 here
    if (num < 0) return NaN;
    else if (num == 0 || num == 1) return 1;
    let output = 1;
    for (let n =2; n <= num; n++) {
        output *= n;
    }
    return output;
}

module.exports = {
    firstName: "BO", 
    lastName: "LI", 
    studentId: "10423232",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};

let fs = require ('fs');
