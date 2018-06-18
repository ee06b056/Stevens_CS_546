const dbConnection = require('./mongoConnection');

const getCollectionFn = (collection) => {
    let _col = undefined;

    return async () => {
        if (!_col) {
            const mongoClient = await dbConnection();
            const db = await mongoClient.db('Bo_Li_lab4');
            _col = await db.collection(collection);
        }
        return _col;
    };
};

module.exports = {
    todoItems: getCollectionFn('todoItems')
}