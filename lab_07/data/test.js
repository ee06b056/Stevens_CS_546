// const recipes = require('./mongoCollections').recipes;
const resipes_db = require('./recipes');

async function main () {
    // let col = await recipes();
    // let arr = await col.find({},{titile:0}).toArray();
    // console.log(arr);
    // let arr = await resipes_db.getAllRecipes();
    // console.log(arr);
    // let a = await resipes_db.getRecipeById();
    // console.log(a);

    // await resipes_db.insertOneRecipe({title: "egg1", ing: "egg1"});
    // await resipes_db.insertOneRecipe({title: "egg2", ing: "egg2"});
    // await resipes_db.insertOneRecipe({title: "egg3", ing: "egg3"});
    // await resipes_db.insertOneRecipe({title: "egg4", ing: "egg4"});
    // await resipes_db.insertOneRecipe({title: "egg5", ing: "egg5"});
    let arr = await resipes_db.getRecipeById('5aa20f4a938ad265a8218d66');
    console.log(arr);

    let arr2 = await resipes_db.getRecipeByTitle('egg2');
    console.log(arr2);
    

}

main();
