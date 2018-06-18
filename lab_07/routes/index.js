const recipesRoutes = require('./recipes');
const bodyParser = require('body-parser');

const constructorMethod = (app) => {
    app.use(bodyParser.json());
    
    app.use("/recipes", recipesRoutes);
    
    app.use("*", (req, res) => {
        res.status(404).json({err:"Not imolemented"});
    });
};

module.exports = constructorMethod;