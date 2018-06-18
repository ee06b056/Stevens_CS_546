const uuid = require('node-uuid');
const bcrypt = require('bcrypt');
const dbConnection = require("../config/mongoConnection");

const cuisine_db = require('../data/cuisines');
const user_db = require('../data/users');
const comment_db = require('../data/comments');

const cuisines = require('./cuisines.json');
const users = require('./users.json');
const comments = require('./comments.json');

async function seed() {
    try {
        console.log('1');
        cuisine_db.drop_cuisine_db();
        user_db.drop_users_db();
        comment_db.drop_comments_db();

        console.log('2');
        const saltRounds = 16;
        let c_name, url, area, ingredients, steps, 
            user_name, password, email,
            cuisine_name, comment;
        console.log('3');
        for (let i = 0; i < cuisines.length; i++) {
            c_name = cuisines[i].name;
            url = cuisines[i].url;
            area = cuisines[i].area;
            ingredients = cuisines[i].ingredients;
            steps = cuisines[i].steps;

            await cuisine_db.addCuisines(c_name, url, area, ingredients, steps);
            console.log(c_name);
        }
        console.log('4');
        for (let i = 0; i < users.length; i++) {
            user_name = users[i].user_name;
            password = users[i].password;
            email = users[i].email;

            await user_db.addAdmin(user_name, password, email);
        }
        console.log('5');
        for (let i = 0; i < comments.length; i++) {
            user_name = comments[i].user_name;
            cuisine_name = comments[i].cuisine_name;
            comment = comments[i].comment;
            await comment_db.addComments(user_name, cuisine_name, comment);
        }
        console.log('6');

        let conn = await dbConnection();
        console.log('7');
        conn.close();
        console.log('8');
        process.exit();


    } catch (err) {
        console.error(err);
    }
};

seed();