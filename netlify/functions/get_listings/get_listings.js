const { MongoClient } = require('mongodb');
require('dotenv').config();

// database connection
const mongoClient = new MongoClient(
  'mongodb+srv://jadtaha:8JlOTrtdfH1u@cluster0.imrf7.mongodb.net/listingsDB?retryWrites=true&w=majority'
);
const clientPromise = mongoClient.connect();

const handler = async (event) => {
  try {
    const database = (await clientPromise).db('listingsDB');
    const collection = database.collection('Listings');
    const results = await collection.find({}).limit(10).toArray();
    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
