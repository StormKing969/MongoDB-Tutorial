const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected Successful")

    const database = client.db('FruitsDB');
    const fruits = database.collection("fruits");

    // create a document to insert
    // const doc = {
    //     name: "Apple",
    //     price: 2.00,
    //   }
  
    //   const result = await collection.insertOne(doc);
    //   console.log(`A document was inserted with the _id: ${result.insertedId}`);

    // ==========================================================================

    // create an array of documents to insert
    // const docs = [
    //     { 
    //         name: "orange", 
    //         healthy: true,
    //         price: 2.00 
    //     },
    //     { 
    //         name: "lettuce", 
    //         healthy: true,
    //         price: 3.00  
    //     },
    //     { 
    //         name: "banana", 
    //         healthy: true,
    //         price: 2.50  
    //     }
    //   ];
  
      // this option prevents additional documents from being inserted if one fails
    //   const options = { ordered: true };
    //   const result = await fruits.insertMany(docs, options);
  
    //   console.log(`${result.insertedCount} documents were inserted`);

    // ==========================================================================

    // query for movies that have a runtime less than 15 minutes

    const query = { price: { $gt: 2 } };

    const options = {

      // sort returned documents in ascending order by title (A->Z)
      sort: { name: 1 },

      // Include only the `title` and `price` fields in each returned document
      projection: { _id: 0, name: 1, price: 1 },

    };

    const cursor = fruits.find(query, options);

    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }

    // replace console.dir with your callback to access individual elements
    await cursor.forEach(console.dir);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);