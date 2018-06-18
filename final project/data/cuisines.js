const mongoCollections = require("../config/mongoCollections");
const Cuisines = mongoCollections.Cuisines;
const uuid = require("node-uuid");
var ObjectId = require('mongodb').ObjectId
const exportedMethods = {

  async getCuisines(name) {
    const cuisineCollection = await Cuisines();
    let thisCuisine = await cuisineCollection.find({ ingredients: name });
    let arr = await thisCuisine.toArray();
    return arr;

  },
  async getCuisineByName(name) {
    const cuisineCollection = await Cuisines();
    let thisCuisine = await cuisineCollection.find({ name: name });
    let arr = await thisCuisine.toArray();

    return arr;

  },
  async updateCuisine(name,url,area,ingredients,steps){
    const cuisineCollection = await Cuisines();
    let thisCuisine = await cuisineCollection.update({name:name},{$set:{ name:name,url:url,area:area,ingredients: ingredients,steps:steps }});
  
  },
  async getCuisineById(id) {
    let sid = ObjectId(id);
    const cuisineCollection = await Cuisines();
    const cuisine = await cuisineCollection.findOne({ _id: ObjectId(sid) });
    let arr = await cuisine.toArray();
    return arr;
  },
  async getAllCuisine(id) {
    const cuisineCollection = await Cuisines();
    return await cuisineCollection.find({}).toArray();
  },
  async getCuisineByArea(area) {
    const cuisineCollection = await Cuisines();
    const cuisine = await cuisineCollection.find({ area: area });
    let arr = await cuisine.toArray();
    return arr;
  },
  async addCuisines(name, url, area, ingredients, steps) {
    if (typeof name !== "string") throw "invalid username";
    if (typeof url !== "string") throw "invalid url";
    if (typeof area !== "string") throw "invalid password";
    if (!Array.isArray(ingredients)) {
      ingredients = [];
    }
    if (!Array.isArray(steps)) {
      steps = [];
    }
    const cuisineCollection = await Cuisines();
    const newCuisine = {
      _id: uuid.v4(),
      name: name,
      url: url,
      area: area,
      ingredients: ingredients,
      steps: steps
    }
    const newInsertInformation = await cuisineCollection.insertOne(newCuisine);
  },
  async drop_cuisine_db () {
    const cuisineCollection = await Cuisines();
    return await cuisineCollection.drop();
  }


};

module.exports = exportedMethods;