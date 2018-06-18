const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'myproject';

const insertDocuments = (db, callback) => {
    const collection = db.collection('documents');

    collection.insertMany ([{a:1},{a:2},{a:3}], (err, result) => {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log('Insert 3 document into the collecntion');
        
        callback(result);
        }
    );
}

const findDocuments = function (db, callback) {
    const collection = db.collection('documents');

    collection.find({'a':3}).toArray((err, docs) => {
        assert.equal(err,null);
        console.log('Found the following records');
        console.log(docs);
        callback(docs);
    });
}

const updateDocument = function (db, callback) {
    const collection = db.collection('documents');
    collection.updateOne({a:4}, {$set: {b:1}}, function (err, result) {
        console.log('update sucessfully.');
        callback(result);
    })
}

MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    console.log('Connection successfully to server.');

    let db = client.db(dbName);

    updateDocument(db, (result) => {
        console.log(result);
        client.close();
    })
});
