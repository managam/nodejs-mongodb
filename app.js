var MongoClient = require("mongodb").MongoClient,
    assert      = require("assert");

// Connection URL
var url = 'mongodb://localhost:27017/nodejs-mongodb';

// Query filter
var query = {'a': 2};

// Update from
var updateFrom = {'a': 2};

// Update to
var updateTo = {'b': 3};

// Remove doc
var removeDoc = {'a': 1};

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db){
    assert.equal(err, null);
    console.log("Connected successfully to server");
    insertDocuments(db, function() {
        // findDocuments(db, function() {
        //     db.close();
        // });
        // findDocumentsQueryFilter(query, db, function() {
        //     db.close();
        // });
        // updateDocument(updateFrom, updateTo, db, function() {
        //     db.close();
        // });
        removeDocument(removeDoc, db, function() {
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

// Find documents with a query filter
var findDocumentsQueryFilter = function(query, db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');

    // Find documents with a query filter
    collection.find(query).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following query records: ", query);
        console.log(docs);
        callback(docs);
    });
}

// Update a document
var updateDocument = function(updateFrom, updateTo, db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');

    // Update document where a is var updateFrom, set var updateTo
    collection.updateOne(updateFrom, {$set: updateTo}, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the document with the field:", updateFrom, "to:", updateTo);
        callback(result);
    }) ;
}

// Remove a document
var removeDocument = function(removeDoc, db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');

    // Remove document where is var removeDoc
    collection.deleteOne(removeDoc, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Remove doc:", removeDoc);
        callback(result);
    });
}