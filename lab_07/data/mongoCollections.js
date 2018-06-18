const dbConnection = require('./mongoConnections');

const getCollectionFn = (collection) => {
    let _col = undefined;

    return async () => {
        if (!_col) {
            const mongoClient = await dbConnection();
            const db = await mongoClient.db("lab7-recipes");
            _col = db.collection(collection);
        }

        return _col;
    }
}

module.exports = {
    recipes : getCollectionFn('recipes')
}

