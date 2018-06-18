const mongoCollections = require("../config/mongoCollections");
const Users = mongoCollections.Users;
const uuid = require("node-uuid");
const bcrypt = require('bcrypt');
const exportedMethods = {

  async getUserByName(name) {
    const userCollection = await Users();
    const thisUser = await userCollection.findOne({ username: name });
    if (!thisUser) return false;
    else{
      return thisUser;
    }
  },

  async getAllUsers() {
    const userCollection = await Users();
    return await userCollection.find({}).toArray();
  },//GET	/Users
  async getUserById(id) {
    const userCollection = await Users();
    const thisUser = await userCollection.findOne({ _id: id });
    if (!thisUser) throw "User not found";
    return thisUser;
  },//GET	/Users/:id
  async isAuthenticated(username, password) {
    if (typeof username !== "string") throw "invalid username";
    if (typeof password !== "string") throw "invalid password";
    const thisUser = await this.getUserByName(username);
    if(thisUser){
       if(await bcrypt.compare(password, thisUser.hashedPassword))
       return thisUser.status;
    }
    else{
      return 0;
    }
  },
  async addAdmin (username, password, email) {
    if (typeof username !== "string") throw "invalid username";
    if (typeof password !== "string") throw "invalid password";
    if (typeof email !== "string") throw "invalid email";
    const userCollection = await Users();
    const saltRounds = 16;
    const newUser = {
      _id: uuid.v4(),
      username: username,
      hashedPassword: await bcrypt.hash(password, saltRounds),
      email: email,
      status: 1
    }
    const newInsertInformation = await userCollection.insertOne(newUser);
    const newId = await newInsertInformation.insertedId;
    return await this.getUserById(newId);
  },

  async addUser(username, password) {
    if (typeof username !== "string") throw "invalid username";
    if (typeof password !== "string") throw "invalid password";
    const userCollection = await Users();
    const saltRounds = 16;
    const newUser = {
      _id: uuid.v4(),
      username: username,
      hashedPassword: await bcrypt.hash(password, saltRounds),
      status: 2
    }
    const newInsertInformation = await userCollection.insertOne(newUser);
    const newId = await newInsertInformation.insertedId;
    return await this.getUserById(newId);
  },//POST	/Users

  async removeUser(id) {
    const userCollection = await Users();
    const deletionInfo = await userCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete User with id of ${id}`;
    }
  },//DELETE	/Users/:id

  async drop_users_db () {
    const userCollection = await Users();
    return await userCollection.drop();
  }



};

module.exports = exportedMethods;