const uuidv1 = require('uuid/v1');
const express = require('express');
const router = express.Router();
const data = require('../data');
const recipe_data = data.recipes_data;

router.get("/", async (req, res) => {
    try {
        let result = await recipe_data.getAllRecipes();
        if (result.length === 0) {
            throw 'Files not found'
        }
        res.json(result);
    } catch (err) {
        res.status(404).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const recipe = await recipe_data.getRecipeById(req.params.id);
        if(!recipe) {
            throw 'File not found';
        }
        res.json(recipe);
    } catch (err) {
        res.status(404).json(err);
    }
});

router.post('/', async (req, res) => {
    try{
        let recipe = {};
        recipe['_id'] = uuidv1();
        if (!req.body.title || typeof (req.body.title) != 'string') {
            throw 'Must provide recipe title';
        }
        recipe['title'] = req.body.title;
        if (!req.body.ingredients || !Array.isArray(req.body.ingredients)) {
            throw 'Must provide recipe ingredient';
        }
        recipe['ingredients'] = req.body.ingredients;
        if (!req.body.steps || !Array.isArray(req.body.steps)) {
            throw 'Must provide recipe steps';
        }
        recipe['steps'] = req.body.steps;
        res.json(await recipe_data.insertOneRecipe(recipe));
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        let oriRecipe = await recipe_data.getRecipeById(req.params.id);
        if (!oriRecipe) {
            throw 'File not found';
        }
    }catch (err) {
        res.status(404).json(err);
    }

    try {
        let newRecipe = {};
        if (req.params.id != req.body._id) {
            throw 'Params id and request body _id should be equal';
        }
        newRecipe['_id'] = req.params.id;
        if (!req.body.title || typeof (req.body.title) != 'string') {
            throw 'Must provide recipe title';
        }
        newRecipe['title'] = req.body.title;
        if (!req.body.ingredients || !Array.isArray(req.body.ingredients)) {
            throw 'Must provide recipe ingredient';
        }
        newRecipe['ingredients'] = req.body.ingredients;
        if (!req.body.steps || !Array.isArray(req.body.steps)) {
            throw 'Must provide recipe steps';
        }
        newRecipe['steps'] = req.body.steps;
        res.json(await recipe_data.replaceRecipe(newRecipe));
    }catch (err) {
        res.status(500).json(err);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        let oriRecipe = await recipe_data.getRecipeById(req.params.id);
        if (!oriRecipe) {
            throw 'File not found';
        }
    } catch (err) {
        res.status(404),json(err);
    }

    try {
        let updRecipe = {};
        if (req.body._id && req.body._id != req.params.id) {
            throw 'Params id and request body _id should be equal';
        }
        updRecipe['_id'] = req.params.id;
        if (req.body.title && typeof (req.body.title) == 'string') {
            updRecipe['title'] = req.body.title;
        }
        if (req.body.ingredients && Array.isArray(req.body.ingredients)) {
            updRecipe['ingredients'] = req.body.ingredients;
        }
        if (req.body.steps && Array.isArray(req.body.steps)) {
            updRecipe['steps'] = req.body.steps;
        }
        res.json(await recipe_data.updateRecipe(updRecipe));
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let value = await recipe_data.deleteRecipeById(req.params.id);
        if (value) {
            res.json('sucess');
        } else {
            throw 'Deletion failed';
        }
    }catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
