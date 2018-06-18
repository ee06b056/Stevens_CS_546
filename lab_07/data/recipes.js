const col = require('./mongoCollections');
const recipes = col.recipes;

module.exports = {
    async getAllRecipes () {
        let recipeCol = await recipes();
        return await recipeCol.find({},{projection: {_id: 1, title: 1}}).toArray();
    },

    async getRecipeById (id) {
        let recipeCol = await recipes();
        return await recipeCol.findOne({_id: id});
    },

    async insertOneRecipe (recipe) {
        let recipeCol = await recipes();
        return (await recipeCol.insertOne(recipe)).ops[0];
    },

    async replaceRecipe (recipe) {
        let recipeCol = await recipes();
        return (await recipeCol.findOneAndReplace({_id: recipe._id}, recipe, {returnOriginal: false})).value;
    },
    async updateRecipe (recipe) {
        let recipeCol = await recipes();
        return (await recipeCol.findOneAndUpdate({_id: recipe._id},{$set: recipe},{returnOriginal: false})).value;
    },
    async deleteRecipeById (id) {
        let recipeCol = await recipes();
        return (await recipeCol.findOneAndDelete({_id: id})).value;
    }
}
