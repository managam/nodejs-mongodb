var MongoClient = require("mongodb").MongoClient,
    assert      = require("assert");

// Connection URL
var url = 'mongodb://localhost:27017/nodejs-mongodb';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db){
    assert.equal(err, null);
    console.log("Connected successfully to server");

    insertDocuments(db, function() {
        findDocuments(db, function() {
                db.close();
        });
    });
});

// Insert documents
var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');

    // Insert some documents
    collection.insertMany([
        {a: 1},
        {a: 2},
        {a: 3}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(result.result.n, 3);
        assert.equal(result.ops.length, 3);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

// Find documents
var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');

    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
}