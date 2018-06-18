const todo = require('./todo');
const mongdoClinet = require("./mongoConnection");


async function main () {
    let arr = await todo.getAllTasks();
    // console.log(arr);

    todo.completeTask('dd16a990-218f-11e8-8568-b179275792cb');

    arr = await todo.getAllTasks();
    console.log(arr);

}

main();