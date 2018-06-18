const mongoConnection = require('./mongoConnection');
const mongoCollections = require('./mongoCollections');
const uuidv1 = require('uuid/v1');
const todoItems = mongoCollections.todoItems;

async function createTask(title, description) {
    if (arguments.length != 2 ||typeof(title) != 'string' || typeof(description) != 'string') {
        throw 'the title and description should both be string';
    }
    let newTask = {
        _id: uuidv1(),
        title: title,
        description: description,
        completed: false,
        completedAt: null
    }
    const todoCollection = await todoItems();
    const insertInfo = await todoCollection.insertOne(newTask);
    console.log(newTask._id);
    return insertInfo;
}

async function getAllTasks() {
    const todoCollection = await todoItems();
    const cursor = todoCollection.find();
    let arr = [];
    while(await cursor.hasNext()) {
        arr.push(await cursor.next());
    }
    if (arr.length == 0) throw 'no task in database.'

    return arr;
}

async function getTask(id) {
    if (typeof(id) != 'string') {
        throw 'you must provide a task id';
    }
    const todoCollection = await todoItems();
    let result = await todoCollection.findOne({_id: id});
    if (result == null) throw 'No task with the id';
    
    return result;
}

async function completeTask(taskId) {
    if (typeof(taskId) != 'string') {
        throw 'you must provide a task id';
    }
    const todoCollection = await todoItems();
    let doc = await getTask(taskId);
    doc.completed = true;
    doc.completedAt = new Date();

    return await todoCollection.findOneAndUpdate({_id: taskId},doc);
}

async function removeTask(id) {
    if (typeof(id) != 'string') {
        throw 'you must provide a task id';
    }
    const todoCollection = await todoItems();

    return await todoCollection.findOneAndDelete({_id: id});
}

module.exports = {
    createTask,
    getAllTasks,
    getTask,
    completeTask,
    removeTask
}