const geometry = require ('./geometry');
const utilities = require ('./utilities');



try {
    console.log(geometry.volumeOfRectangularPrism(1));
} catch (err) {
    console.log(err);
}
try {
    console.log(geometry.volumeOfRectangularPrism(1,2,3,4));
} catch (err) {
    console.log(err);
}
try {
    console.log(geometry.volumeOfRectangularPrism(1,2,'3'));
} catch (err) {
    console.log(err);
}
try {
    console.log(geometry.volumeOfRectangularPrism(1,2,0));
} catch (err) {
    console.log(err);
}
try {
    console.log(geometry.volumeOfRectangularPrism(1,2,3));
} catch (err) {
    console.log(err);
}
try {
    console.log(geometry.surfaceAreaOfRectangularPrism(1));
} catch (err) {
    console.log(err);
}
try {
    console.log(geometry.surfaceAreaOfRectangularPrism(1,2,3,4));
} catch (err) {
    console.log(err);
}
try {
    console.log(geometry.surfaceAreaOfRectangularPrism(1,2,'3'));
} catch (err) {
    console.log(err);
}
try {
    console.log(geometry.surfaceAreaOfRectangularPrism(1,2,0));
} catch (err) {
    console.log(err);
}
try {
    console.log(geometry.surfaceAreaOfRectangularPrism(1,2,3));
} catch (err) {
    console.log(err);
}
try {
    console.log(geometry.surfaceAreaOfSphere());
}catch (err) {
    console.log(err);
}
try {
    console.log(geometry.surfaceAreaOfSphere(1,2));
}catch (err) {
    console.log(err);
}
try {
    console.log(geometry.surfaceAreaOfSphere([1]));
}catch (err) {
    console.log(err);
}
try {
    console.log(geometry.surfaceAreaOfSphere(0));
}catch (err) {
    console.log(err);
}
try {
    console.log(geometry.surfaceAreaOfSphere(4));
}catch (err) {
    console.log(err);
}
try {
    console.log(geometry.volumeOfSphere());
}catch (err){
    console.log(err);
}
try {
    console.log(geometry.volumeOfSphere(1,2));
}catch (err){
    console.log(err);
}
try {
    console.log(geometry.volumeOfSphere([4]));
}catch (err){
    console.log(err);
}
try {
    console.log(geometry.volumeOfSphere(0));
}catch (err){
    console.log(err);
}
try {
    console.log(geometry.volumeOfSphere(4));
}catch (err) {
    console.log(err);
}
try {
    console.log(utilities.deepEquality({a:1,b:2}));
} catch (err) {
    console.log(err);
}
try {
    console.log(utilities.deepEquality('123','123'));
} catch (err) {
    console.log(err);
}
try {
    console.log(utilities.deepEquality(null,null));
} catch (err) {
    console.log(err);
}
try {
    console.log(utilities.deepEquality({a:1,b:2},{a:1,c:2}));
} catch (err) {
    console.log(err);
}
try {
    console.log(utilities.deepEquality({a:1,b:2},{b:2,a:1}));
} catch (err) {
    console.log(err);
}
try {
    console.log(utilities.uniqueElements(123));
} catch (err) {
    console.log(err);
}
try {
    console.log(utilities.uniqueElements('12345678'));
} catch (err) {
    console.log(err);
}
try {
    console.log(utilities.uniqueElements([1,2,3,4,5,5,5,5]));
} catch (err) {
    console.log(err);
}
try {
    console.log(utilities.uniqueElements(null));
} catch (err) {
    console.log(err);
}
try {
    console.log(utilities.uniqueElements(undefined));
} catch (err) {
    console.log(err);
}
try{
    console.log(utilities.countOfEachCharacterInString(null));
} catch (err) {
    console.log(err);
}
try{
    console.log(utilities.countOfEachCharacterInString(undefined));
} catch (err) {
    console.log(err);
}
try{
    console.log(utilities.countOfEachCharacterInString(123));
} catch (err) {
    console.log(err);
}
try{
    console.log(utilities.countOfEachCharacterInString([123]));
} catch (err) {
    console.log(err);
}
try{
    console.log(utilities.countOfEachCharacterInString('ou will wrdfdsfadfasfasfisafaslkfjaskljfklasjfkljkl'));
} catch (err) {
    console.log(err);
}