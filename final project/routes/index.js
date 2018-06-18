const postRoutes = require("./post");
//const cuisineRoutes = require("./cuisines");
const path = require("path");

const constructorMethod = app => {
  
  
  //app.use('/cuisine', cuisineRoutes);
  // app.get("/index", (req, res) => {
  //   res.render(path.join(__dirname,'/views/layouts/index.handlebars'));
  // });

  // app.use("*", (req, res) => {
  //   res.redirect("/post");
  // });
  app.use('/', postRoutes);
  
};

module.exports = constructorMethod;