const mongoCollections = require("../config/mongoCollections");
const Comments = mongoCollections.Comments;
const uuid = require("node-uuid");
var ObjectId = require('mongodb').ObjectId
const exportedMethods = {

  async getCommentsByName(name) {
    const commentCollection = await Comments();
    let thisComment = await commentCollection.find({cuisine_name:name});
    let arr = await thisComment.toArray();
    //console.log(arr);
    // if (!thisCuisine) return false;
      return arr;
    
  },
  async getCommentById(id) {
    const commentCollection = await Comments();
    const comment = await commentCollection.findOne({_id:id });
   
    //let arr = await comment.toArray();
 
    return comment;
  },
  async addComments(user_name, cuisine_name, comment) {
    console.log('comment');
    if (typeof user_name !== "string") throw "invalid user name";
    if (typeof cuisine_name !== "string") throw "invalid cuisine name";
    if (typeof comment !== "string") throw "invalid comment";
    const commentCollection = await Comments();
    const newComment = {
      _id: uuid.v4(),
      user_name: user_name,
      cuisine_name: cuisine_name,
      comment: comment,
    }
    console.log(newComment);
    const newInsertInformation = await commentCollection.insertOne(newComment);
    const newId = await newInsertInformation.insertedId;
    return await this.getCommentById(newId);
  },
  async drop_comments_db () {
    const commentCollection = await Comments();
    return await commentCollection.drop();
  }


};

module.exports = exportedMethods;