const mongoClient = require('./mongoConnection')
const todo = require('./todo');

const task_1 = {
    title: "Ponder Dinosaurs",
    description: "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?"
}
const task_2 = {
    title: "Play Pokemon with Twitch TV",
    description: "Should we revive Helix?"
}

async function main () {
    try{
        //Step 1:
        let r_1 = await todo.createTask(task_1.title, task_1.description);
    
        //Step 2:
        let tasks_1 = await todo.getAllTask();
        console.log('The existing task is');
        console.log(tasks_1[0]);
        let r_2 = await todo.createTask(task_2.title,task_2.description);
        
        //Step 3:
        let tasks_2 = await todo.getAllTask();
        console.log(`The existing tasks are`);
        console.log(tasks_2);
    
        //Step 4:
        let r_3 = await todo.removeTask(tasks_2[0]._id);
        
        //Step 5:
        let tasks_3 = await todo.getAllTask();
        console.log(`The existing task is`);
        console.log(tasks_3);
    
        //Step 6:
        for (let each of tasks_3) {
            await todo.completeTask(each._id);
        }
    
        //Step 7:
        console.log(await todo.getAllTask());
    
    } catch (err) {
        throw err;
    } finally {
        const mClient = await mongoClient();
        mClient.close();
    }
}

main();